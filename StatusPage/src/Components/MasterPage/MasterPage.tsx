import MasterPage from 'CommonUI/src/Components/MasterPage/MasterPage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import React, { FunctionComponent, ReactElement, useState } from 'react';
import URL from 'Common/Types/API/URL';
import PageLoader from 'CommonUI/src/Components/Loader/PageLoader';
import BaseAPI from 'CommonUI/src/Utils/API/API';
import { DASHBOARD_API_URL } from 'CommonUI/src/Config';
import Navigation from 'CommonUI/src/Utils/Navigation';
import ObjectID from 'Common/Types/ObjectID';
import BadDataException from 'Common/Types/Exception/BadDataException';
import useAsyncEffect from 'use-async-effect';
import { JSONFunctions, JSONObject } from 'Common/Types/JSON';
import HTTPErrorResponse from 'Common/Types/API/HTTPErrorResponse';
import ErrorMessage from 'CommonUI/src/Components/ErrorMessage/ErrorMessage';
import RouteParams from '../../Utils/RouteParams';
import RouteMap from '../../Utils/RouteMap';
import PageMap from '../../Utils/PageMap';
import LocalStorage from 'CommonUI/src/Utils/LocalStorage';
import BaseModel from 'Common/Models/BaseModel';
import File from 'Model/Models/File';
import { ImageFunctions } from 'CommonUI/src/Components/Image/Image';

export interface ComponentProps {
    children: ReactElement | Array<ReactElement>;
    isLoading?: boolean | undefined;
    error?: string | undefined;
    onLoadComplete: (masterPage: JSONObject) => void;
}

const DashboardMasterPage: FunctionComponent<ComponentProps> = (
    props: ComponentProps
): ReactElement => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [masterPageData, setMasterPageData] = useState<JSONObject | null>(null);
    const [statusPageId, setStatusPageId] = useState<ObjectID | null>(null);
    const [headerHtml, setHeaderHtml] = useState<null | string>(null)
    const [footerHtml, setFooterHTML] = useState<null | string>(null)

    const getId = async (): Promise<ObjectID> => {
        const id: string | null = Navigation.getParamByName(RouteParams.StatusPageId, RouteMap[PageMap.PREVIEW_OVERVIEW]!);
        if (id) {
            return new ObjectID(id);
        }

        throw new BadDataException("Status Page ID not found");
    };

    useAsyncEffect(async () => {
        try {
            setIsLoading(true);
            const id = await getId();
            setStatusPageId(id)
            LocalStorage.setItem('statusPageId', id);
            const response = await BaseAPI.post<JSONObject>(URL.fromString(DASHBOARD_API_URL.toString()).addRoute(`/status-page/master-page/${id.toString()}`), {}, {});
            setMasterPageData(response.data);


            // setfavicon.
            const favIcon = JSONFunctions.getJSONValueInPath(response.data || {}, "statusPage.faviconFile") as File;
            if (favIcon && favIcon.file) {
                let link = document.createElement('link');
                link.rel = 'icon';
                (document as any).getElementsByTagName('head')[0].appendChild(link);
                link.href = ImageFunctions.getImageURL(favIcon);
            }

            // setcss.
            const css = JSONFunctions.getJSONValueInPath(response.data || {}, "statusPage.customCSS") as string;
            if (css) {
                let style = document.createElement('style');
                style.innerText = css;
                (document as any).getElementsByTagName('head')[0].appendChild(style);
            }

            const headHtml = JSONFunctions.getJSONValueInPath(response.data || {}, "statusPage.headerHTML") as string;
            const footHTML = JSONFunctions.getJSONValueInPath(response.data || {}, "statusPage.footerHTML") as string;
            
            
            if (headHtml) {
                setHeaderHtml(headHtml);
            }
            
            if (footHTML) {
                setFooterHTML(footHTML);
            }

            props.onLoadComplete(response.data);
            setIsLoading(false);
        } catch (err) {
            try {
                setError(
                    (err as HTTPErrorResponse).message ||
                    'Server Error. Please try again'
                );
            } catch (e) {
                setError('Server Error. Please try again');
            }
            setIsLoading(false);
        }
    }, []);



    if (isLoading) {
        return <PageLoader isVisible={true} />
    }

    if (error) {
        return <ErrorMessage error={error} />
    }

    console.log(headerHtml);

    return (
        <MasterPage

            footer={!footerHtml ? <Footer
                copyright={JSONFunctions.getJSONValueInPath(masterPageData || {}, "statusPage.copyrightText") as string || ''}

                links={(JSONFunctions.getJSONValueInPath(masterPageData || {}, "footerLinks") as Array<JSONObject> || []).map((link) => {
                    return {
                        title: link['title'] as string,
                        to: link['link'] as URL,
                        openInNewTab: true,
                    }
                })} /> : <div dangerouslySetInnerHTML={{ __html: footerHtml as string }} />}
            header={!headerHtml ? <Header
                logo={JSONFunctions.getJSONValueInPath(masterPageData || {}, "statusPage.logoFile") as BaseModel || undefined}
                banner={JSONFunctions.getJSONValueInPath(masterPageData || {}, "statusPage.coverImageFile") as BaseModel || undefined}
                links={(JSONFunctions.getJSONValueInPath(masterPageData || {}, "headerLinks") as Array<JSONObject> || []).map((link) => {
                    return {
                        title: link['title'] as string,
                        to: link['link'] as URL,
                        openInNewTab: true,
                    }
                })} /> : <div dangerouslySetInnerHTML={{ __html: headerHtml as string }} />}
            navBar={<NavBar show={true} isPreview={true} />}
            isLoading={props.isLoading || false}
            error={props.error || ''}
            mainContentStyle={{
                display: 'flex',
                alignItems: 'center',
                margin: 'auto',
                maxWidth: '880px',
                marginLeft: 'auto !important',
            }}
        >
            {React.cloneElement(props.children as any, {
                statusPageId: statusPageId,
            })}
        </MasterPage>
    );
};

export default DashboardMasterPage;
