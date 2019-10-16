import React from 'react';
import MonitorTutorial from './MonitorTutorial';
import PropTypes from 'prop-types';

const Tutorials = ({ type }) =>
    (
        <div tabIndex='0' className="Box-root Margin-vertical--12" >
            <div className="db-Trends bs-ContentSection Card-root Card-shadow--medium">
                <div className="Box-root">
                    <div className="db-Trends-header">
                        <div className="db-Trends-title" style={{ margin: '0' }}>
                            <div className="ContentHeader-center Box-root Flex-flex Flex-direction--column Flex-justifyContent--center">
                                <span className="ContentHeader-title Text-color--dark Text-display--inline Text-fontSize--20 Text-fontWeight--regular Text-lineHeight--28 Text-typeface--base Text-wrap--wrap">
                                    <span>
                                        Quick tips
                                    </span>
                                </span>
                                <span className="ContentHeader-description Text-color--inherit Text-display--inline Text-fontSize--14 Text-fontWeight--regular Text-lineHeight--20 Text-typeface--base Text-wrap--wrap">
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="db-Trends-content">
                        <div className="ContentHeader-center Box-root Flex-flex Flex-direction--column Flex-justifyContent--center">
                            <MonitorTutorial type={type} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

Tutorials.displayName = 'TutorialBox';

Tutorials.propTypes = {
    type: PropTypes.string
};

export default Tutorials;