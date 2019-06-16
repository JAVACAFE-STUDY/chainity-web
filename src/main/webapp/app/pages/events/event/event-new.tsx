import '../event.css';

import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSession } from 'app/shared/reducers/authentication';
import { createEvent, getEvents } from '../event.reducer';
import ApplyList from '../../../components/card/apply-list';
import CompletionList from '../../../components/card/completion-list';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { createStyles, withStyles } from '@material-ui/core/styles';
import CustomFormControl from 'app/components/form/custom-form-control';
import DateRangePicker from 'app/components/form/date-range-picker';
import { convertDate } from 'app/shared/util/date-utils';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl/FormControl';

export const styles = theme =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing.unit * 2,
            textAlign: 'left',
            color: theme.palette.text.secondary
        },
        item: {
            marginTop: '20px'
        },
        margin: {
            margin: theme.spacing.unit
        },
        customMargin: {
            margin: theme.spacing.unit,
            width: '100%'
        },
        bootstrapFormLabel: {
            fontSize: 18
        }
    });

const sidebarContent = classes => (
    <Paper className={ classes.paper }>
        <ApplyList participations={ [] }/>
        <Divider variant="middle"/>
        <CompletionList/>
    </Paper>
);

export interface IEventNewPageProp extends StateProps, DispatchProps, RouteComponentProps {
    classes: any;
    match: any;
}

export interface IEventNewPageState {
    title: string;
    reward: number;
    contents: string;
    date: any;
}

export class EventNewPage extends React.Component<IEventNewPageProp, IEventNewPageState> {

    state: IEventNewPageState = {
        title: '',
        reward: 0,
        contents: '',
        date: {}
    };

    componentDidMount() {
        // this.props.getSession();
    }

    handleRangeDateChange = value => {
        // console.log('handleRangeDateChange ==> ', value);
        this.setState({ date: { ...this.state.date, ...value } });
        // console.log('handleRangeDateChange this.state.date :==> ', this.state.date);
    };

    onChange = type => value => {
        switch (type) {
            case 'title':
                this.setState({ title: value });
                break;
            case 'reward':
                this.setState({ reward: value });
                break;
            case 'contents':
                this.setState({ contents: value });
                break;
            default:
                break;
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        const { title, contents, reward, date } = this.state;
        // console.log('handleSubmit ===>', title, contents, reward, date.start, date.end);
        const startDate = convertDate(date.start);
        const finishDate = convertDate(date.end);
        this.props.createEvent('1', { 'title': title, 'description': contents, 'tokens': reward, 'startDate': startDate, 'finishDate': finishDate });
        this.props.history.push('/event');
    };

    render() {
        const { classes } = this.props;
        // match.params.id
        const multiline = true;
        const clearable = true;
        return (
            <div>
                <Grid container spacing={ 24 }>
                    <Grid item xs={ 9 }>
                        <React.Fragment>
                            <Paper className={ classes.paper }>
                                <form onSubmit={ this.handleSubmit }>
                                    <CustomFormControl title={ '제목' } onChange={ this.onChange('title') }/>
                                    <CustomFormControl title={ '보상금' } type={ 'number' } onChange={ this.onChange('reward') }/>
                                    <div>
                                        <FormControl className={ classes.customMargin }>
                                            <InputLabel shrink htmlFor="bootstrap-input" className={ classes.bootstrapFormLabel }>
                                                { '참여 신청 기간 (시작일 ~ 종료일)' }
                                            </InputLabel>
                                        </FormControl>
                                        <DateRangePicker onChange={ this.handleRangeDateChange } clearable={ clearable }/>
                                    </div>
                                    <CustomFormControl title={ '내용' } onChange={ this.onChange('contents') } multiline={ multiline } rows={ 8 }/>
                                    <div>
                                        <Link to={ '/event' }>
                                            목록으로 가기
                                        </Link>
                                        <Button type="submit">
                                            등록
                                        </Button>
                                    </div>
                                </form>
                            </Paper>
                        </React.Fragment>
                    </Grid>
                    <Grid item xs={ 3 }>
                        { sidebarContent(classes) }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = storeState => ({
    isAuthenticated: storeState.authentication.isAuthenticated,
    events: storeState.event.events
});

const mapDispatchToProps = { getSession, getEvents, createEvent };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventNewPage)));