import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PerformanceChart from '../basic/performanceChart';
import DateTimeRangePicker from '../basic/DateTimeRangePicker';
import moment from 'moment';
import {
    fetchTimeMetrics,
    fetchThroughputMetrics,
    setTimeStartDate,
    setTimeEndDate,
    setThroughputEndDate,
    setThroughputStartDate,
} from '../../actions/performanceTrackerMetric';

//import ShouldRender from '../../components/basic/ShouldRender';

export class ChartComponent extends Component {
    componentDidMount() {
        const {
            performanceTracker,
            type,
            timeStartDate,
            timeEndDate,
            throughputStartDate,
            throughputEndDate,
            fetchTimeMetrics,
            fetchThroughputMetrics,
        } = this.props;

        if (performanceTracker && type === 'throughput') {
            const { _id, key } = performanceTracker;
            fetchTimeMetrics({
                appId: _id,
                key,
                startDate: throughputStartDate,
                endDate: throughputEndDate,
            });
        } else if (performanceTracker && type === 'transactionTime') {
            const { _id, key } = performanceTracker;
            fetchThroughputMetrics({
                appId: _id,
                key,
                startDate: timeStartDate,
                endDate: timeEndDate,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (
            JSON.stringify(prevProps.performanceTracker) !==
            JSON.stringify(this.props.performanceTracker)
        ) {
            const {
                performanceTracker,
                type,
                timeStartDate,
                timeEndDate,
                throughputStartDate,
                throughputEndDate,
                fetchTimeMetrics,
                fetchThroughputMetrics,
            } = this.props;

            if (performanceTracker && type === 'throughput') {
                const { _id, key } = performanceTracker;
                fetchTimeMetrics({
                    appId: _id,
                    key,
                    startDate: throughputStartDate,
                    endDate: throughputEndDate,
                });
            } else if (performanceTracker && type === 'transactionTime') {
                const { _id, key } = performanceTracker;
                fetchThroughputMetrics({
                    appId: _id,
                    key,
                    startDate: timeStartDate,
                    endDate: timeEndDate,
                });
            }
        }
    }

    handleCurrentDateRange = () => {
        const {
            type,
            timeStartDate,
            timeEndDate,
            throughputStartDate,
            throughputEndDate,
        } = this.props;
        let startDate = timeStartDate,
            endDate = timeEndDate;
        if (type === 'throughput') {
            startDate = throughputStartDate;
            endDate = throughputEndDate;
        }
        return { startDate, endDate };
    };

    handleStartDate = val => {
        const {
            type,
            setTimeStartDate,
            setThroughputStartDate,
            fetchTimeMetrics,
            fetchThroughputMetrics,
            timeEndDate,
            throughputEndDate,
            performanceTracker,
        } = this.props;

        if (type === 'throughput') {
            setThroughputStartDate(val);

            performanceTracker &&
                fetchThroughputMetrics({
                    appId: performanceTracker._id,
                    key: performanceTracker.key,
                    startDate: val,
                    endDate: throughputEndDate,
                });
        } else if (type === 'transactionTime') {
            setTimeStartDate(val);

            performanceTracker &&
                fetchTimeMetrics({
                    appId: performanceTracker._id,
                    key: performanceTracker.key,
                    startDate: val,
                    endDate: timeEndDate,
                });
        }
    };

    handleEndDate = val => {
        const {
            type,
            setTimeEndDate,
            setThroughputEndDate,
            fetchTimeMetrics,
            fetchThroughputMetrics,
            timeStartDate,
            throughputStartDate,
            performanceTracker,
        } = this.props;

        if (type === 'throughput') {
            setThroughputEndDate(val);

            performanceTracker &&
                fetchThroughputMetrics({
                    appId: performanceTracker._id,
                    key: performanceTracker.key,
                    startDate: throughputStartDate,
                    endDate: val,
                });
        } else if (type === 'transactionTime') {
            setTimeEndDate(val);

            performanceTracker &&
                fetchTimeMetrics({
                    appId: performanceTracker._id,
                    key: performanceTracker.key,
                    startDate: timeStartDate,
                    endDate: val,
                });
        }
    };

    render() {
        const {
            heading,
            title,
            subHeading,
            type,
            timeMetrics,
            throughputMetrics,
        } = this.props;
        const status = {
            display: 'inline-block',
            borderRadius: '2px',
            height: '8px',
            width: '8px',
            margin: '0 8px 1px 0',
            backgroundColor: 'rgb(117, 211, 128)',
        };
        return (
            <div className="Box-root Margin-bottom--12">
                <div className="bs-ContentSection Card-root Card-shadow--medium">
                    <div className="Box-root">
                        <div className="bs-ContentSection-content Box-root Box-divider--surface-bottom-1 Flex-flex Flex-alignItems--center Flex-justifyContent--spaceBetween Padding-horizontal--20 Padding-vertical--16">
                            <div className="Box-root">
                                <span className="Text-color--inherit Text-display--inline Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                    <span>{heading}</span>
                                </span>
                                <p>
                                    <span>{subHeading}</span>
                                </p>
                                <div
                                    className="db-Trends-controls"
                                    style={{ marginTop: '15px' }}
                                >
                                    <div className="db-Trends-timeControls">
                                        <DateTimeRangePicker
                                            currentDateRange={this.handleCurrentDateRange()}
                                            handleStartDateTimeChange={val =>
                                                this.handleStartDate(
                                                    moment(val)
                                                )
                                            }
                                            handleEndDateTimeChange={val =>
                                                this.handleEndDate(moment(val))
                                            }
                                            formId={`performanceTrackeringDateTime-${heading}`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="db-ListViewItem-cellContent Box-root">
                                <span className="db-ListViewItem-text Text-color--cyan Text-display--inline Text-fontSize--14 Text-fontWeight--medium Text-lineHeight--20 Text-typeface--base Text-wrap--wrap">
                                    <div className="Box-root Margin-right--16">
                                        <span className="Text-display--inline Text-fontSize--14 Text-fontWeight--regular Text-lineHeight--20 Text-typeface--base Text-wrap--wrap Text-color--dark">
                                            <span></span>
                                        </span>
                                    </div>
                                </span>
                                <div className="Box-root Flex">
                                    <div className="Box-root Flex-flex">
                                        <div className="db-RadarRulesListUserName Box-root Flex-flex Flex-alignItems--center Flex-direction--row Flex-justifyContent--flexStart">
                                            <div className="Box-root Flex-inlineFlex Flex-alignItems--center">
                                                <span className="Text-display--inline Text-fontSize--14 Text-fontWeight--regular Text-lineHeight--20 Text-typeface--base Text-wrap--wrap Text-color--dark">
                                                    <span></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="bs-ContentSection-content Box-root Box-background--offset Box-divider--surface-bottom-1 Padding-vertical--2"
                            style={{ boxShadow: 'none' }}
                        >
                            <div>
                                <div className="bs-Fieldset-wrapper Box-root Margin-bottom--2">
                                    <div
                                        style={{
                                            margin: '30px 20px 10px 20px',
                                        }}
                                    >
                                        {type === 'transactionTime' && (
                                            <PerformanceChart
                                                type={`url`}
                                                data={timeMetrics.metrics}
                                                name={'response time'}
                                                symbol="ms"
                                                requesting={
                                                    timeMetrics.requesting
                                                }
                                            />
                                        )}
                                        {type === 'throughput' && (
                                            <PerformanceChart
                                                type={`url`}
                                                data={throughputMetrics.metrics}
                                                name={'request per time'}
                                                symbol=""
                                                requesting={
                                                    throughputMetrics.requesting
                                                }
                                            />
                                        )}
                                    </div>
                                    <div className="bs-ContentSection-content Box-root Box-divider--surface-bottom-1 Flex-flex Flex-alignItems--center Flex-justifyContent--spaceBetween Padding-horizontal--20">
                                        <div className="Box-root">
                                            {title.map((t, i) => (
                                                <Fragment key={i}>
                                                    <span className="Text-color--inherit Text-display--inline Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                                        <span
                                                            style={status}
                                                        ></span>
                                                        <span>{t}</span>
                                                    </span>
                                                    <span>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </span>
                                                </Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bs-ContentSection-footer bs-ContentSection-content Box-root Box-background--white Flex-flex Flex-alignItems--center Flex-justifyContent--spaceBetween Padding-horizontal--20 Padding-vertical--12">
                            <div className="bs-Tail-copy">
                                <div className="Box-root Flex-flex Flex-alignItems--stretch Flex-direction--row Flex-justifyContent--flexStart">
                                    <div style={{ height: '20px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ChartComponent.displayName = 'ChartComponent';

ChartComponent.propTypes = {
    heading: PropTypes.any,
    subHeading: PropTypes.any,
    title: PropTypes.shape({
        map: PropTypes.func,
    }),
    fetchTimeMetrics: PropTypes.func,
    fetchThroughputMetrics: PropTypes.func,
    setThroughputStartDate: PropTypes.func,
    setThroughputEndDate: PropTypes.func,
    setTimeStartDate: PropTypes.func,
    setTimeEndDate: PropTypes.func,
    timeStartDate: PropTypes.string,
    timeEndDate: PropTypes.string,
    throughputStartDate: PropTypes.string,
    throughputEndDate: PropTypes.string,
    timeMetrics: PropTypes.object,
    throughputMetrics: PropTypes.object,
    type: PropTypes.string,
    performanceTracker: PropTypes.object,
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchTimeMetrics,
            fetchThroughputMetrics,
            setThroughputStartDate,
            setThroughputEndDate,
            setTimeStartDate,
            setTimeEndDate,
        },
        dispatch
    );

function mapStateToProps(state) {
    return {
        currentProject: state.project.currentProject,
        timeStartDate: state.performanceTrackerMetric.timeStartDate,
        timeEndDate: state.performanceTrackerMetric.timeEndDate,
        throughputStartDate: state.performanceTrackerMetric.throughputStartDate,
        throughputEndDate: state.performanceTrackerMetric.throughputEndDate,
        timeMetrics: state.performanceTrackerMetric.timeMetrics,
        throughputMetrics: state.performanceTrackerMetric.throughputMetrics,
        performanceTracker:
            state.performanceTracker.fetchPerformanceTracker &&
            state.performanceTracker.fetchPerformanceTracker.performanceTracker,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartComponent);
