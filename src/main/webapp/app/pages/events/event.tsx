/* tslint:disable:ter-arrow-body-style */
import './event.css';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import {
    Button,
    Card, CircularProgress,
    createStyles,
    Divider,
    Fab,
    FormControl,
    Grid,
    IconButton,
    Input,
    List,
    Paper,
    Typography,
    WithStyles,
    withStyles
} from '@material-ui/core';
import { BlurCircular } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import HomeStatus from 'app/components/card/home-status';
import MemberRank from 'app/components/card/memebr-rank';
import { getSession } from 'app/shared/reducers/authentication';
import { getAggsParticipations, getEvent } from 'app/pages/events/event.reducer';
import { getUsers } from 'app/pages/users/users.reducer';
import { connect } from 'react-redux';

interface IEventList {
    totalDocs: number;
    offset: number;
    limit: number;
    docs: IEventListItem[];
}

interface IEventListItem {
    _id: string;
    title: string;
    description: string;
    tokens: number;
    maxNumberOfParticipants: number;
    startDate: string;
    endDate: string;
    isClosed: string;
    createdAt: string;
    createdBy: string;
}

interface IEventListParam {
    offset: number;
    limit: number;
    keyword?: string;
}

interface IEventListState {
    data?: IEventList;
    nowDate: Date;
    list?: IEventListItem[];
    isNext?: Boolean;
    param: IEventListParam;
    isRequest: boolean;
}

export const styles = theme =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing.unit * 2,
            textAlign: 'center',
            color: theme.palette.text.secondary
        },
        fab: {
            margin: 0,
            top: 'auto',
            left: 20,
            bottom: 50,
            right: 'auto',
            position: 'fixed'
        },
        input: {
            padding: '10px',
            marginLeft: '8px',
            flex: 1
        },
        iconButton: {
            padding: 10
        },
        noData: {
            textAlign: 'center'
        },
        listItemLink: {
            '&:hover': {
                'text-decoration': 'none'
            }
        },
        listItem: {
            height: '200px',
            margin: '20px 0',
            padding: '20px'

        },
        listItemTitle: {
            'font-size': '1.5em',
            margin: '10px 0'
        },
        listItemContent: {
            display: '-webkit-box',
            overflow: 'hidden',
            'text-overflow': 'ellipsis',
            '-webkit-line-clamp': 2,
            '-webkit-box-orient': 'vertical',
            'font-size': '1.2rem',
            'line-height': '2rem',
            'letter-spacing': '-1px',
            margin: '5px 0px'
        },
        listItemCoinIcon: {
            display: 'inline',
            'font-size': '1.5em',
            color: '#FFF42F'
        },
        listItemTokens: {
            display: 'inline',
            padding: '0 5px',
            width: '50px'
        },
        listItemStartDate: {
            display: 'inline',
            padding: '0 5px'
        },
        search: {
            root: {
                padding: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                flexGrow: 1
            },
            input: {
                padding: '10px',
                'marge-left': '8px',
                flex: 1
            },
            iconButton: {
                padding: 10
            },
            divider: {
                width: 1,
                height: 28,
                margin: 4
            }
        },
        'divider-margin': {
            margin: '10px',
            backgroundColor: 'transparent'
        }
    });

const stateParamToParam = (param: IEventListParam) => {
    return Object.keys(param).reduce((pv, cv) => {
        Object.assign(pv, { [ cv ]: param[ cv ] });
        return pv;
    }, {});
};

const searchBar = (classes, { changeEvent, enterEvent, clickSearch, state: { isRequest } }) => {
    return (
        <Paper className={ classes.search.root } elevation={ 1 }>
                <FormControl fullWidth>
                    <Input
                        className={ classes.search.input }
                        placeholder=" 이벤트 검색 키워드를 입력해주세요. "
                        onChange={ changeEvent }
                        onKeyUp={ enterEvent }
                        disabled={isRequest}
                        endAdornment={
                            <IconButton className={ classes.search.iconButton } aria-label="Search">
                                {
                                    isRequest
                                        ? <CircularProgress size={23} />
                                        : <SearchIcon onClick={ clickSearch }/>
                                }
                            </IconButton>
                        }
                    />
                </FormControl>

        </Paper>
    );
};

const listItem = (classes, { event, index }, calcDate) => {
    return (
        <Link to={ { pathname: `/event/detail/${ event._id }`, search: `id=${event._id}` } } key={ index } className={ classes.listItemLink }>
            <Card className={ classes.listItem }>
                <Typography component="p" className={ classes.listItemTitle }>
                    { event.title }
                </Typography>
                <Typography className={ classes.listItemContent } component="span" color="textSecondary" >
                    { event.description }
                </Typography>
                <BlurCircular className={ classes.listItemCoinIcon }/>
                <Typography component="span"
                            className={ classes.listItemTokens }>
                    { event.tokens }
                </Typography>
                <Typography component="span"
                            className={ classes.listItemStartDate }>
                    { calcDate(event.createdAt) }
                </Typography>
            </Card>
        </Link>
    );
};
const listWrapper = (classes, list, { calcDate }) => {
    return (
        <List>
            { list.length
                ? list.map((event, index) => (listItem(classes, { event, index }, calcDate)))
                : <React.Fragment/>
            }
        </List>
    );
};

interface IEventPageProp extends StateProps, DispatchProps, RouteComponentProps<{}>, WithStyles {
}

export class EventPage extends React.Component<IEventPageProp, IEventListState> {
    state: IEventListState = {
        param: {
            limit: 10,
            offset: 0
        },
        nowDate: new Date(),
        list: [],
        isRequest: false
    };

    async componentDidMount() {
        await this.search();
        window.addEventListener('scroll', this.scrollEvent);
        this.props.getAggsParticipations('1');
        if (this.props.account.name !== 'system') {
            this.betaAlertMessage();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollEvent);
    }

    betaAlertMessage = () => {
        alert('오프라인 데이터를 온라인으로 옮기는 작업이 진행 중입니다. 서비스 소개 페이지로 이동합니다.');
        window.location.href = 'https://chainity.co.kr/';
    };

    scrollEvent = () => {
        if ((window.scrollY + window.innerHeight) === document.body.offsetHeight) {
            this.nextPageSearch();
        }
    };

    clickSearch = () => {
        this.setState({
            ...this.state,
            param: {
                ...this.state.param,
                offset: 0
            },
            list: []
        });
        this.search();
    };

    search = async () => {
        this.setState({
            isRequest: true
        });

        try {
            const res = await axios.get('/v1/groups/1/events', {
                params: {
                    ...stateParamToParam(this.state.param)
                }
            });
            this.setState({
                ...this.state,
                isNext: (Number(res.data.offset) + res.data.docs.length) < res.data.totalDocs,
                data: res.data,
                list: res.data.docs.reduce((previousValue, currentValue) => {
                    previousValue.push(currentValue);
                    return previousValue;
                }, this.state.list)
            });
        } finally {
            this.setState({
                isRequest: false
            });
        }
    };

    enterEvent = e => {
        if (e.key === 'Enter') {
            this.clickSearch();
        }
    };

    nextPageSearch = () => {
        if (this.state.isNext) {
            this.setState({
                ...this.state,
                param: {
                    ...this.state.param,
                    offset: this.state.param.offset + this.state.param.limit
                }
            });
            this.search();
        }
    };

    changeEvent = e => {
        this.setState({
            ...this.state,
            param: {
                limit: this.state.param.limit,
                offset: this.state.param.offset,
                keyword: e.target.value
            }
        });
    };

    calcDate = (startDate: string) => {
        if (!startDate) {
            return '';
        }
        try {
            const startDateObject = new Date(startDate);
            const secondDate = (this.state.nowDate.valueOf() - startDateObject.valueOf()) / 1000;
            if ((secondDate / 60) <= 1) {
                return `${ (secondDate).toFixed(0) } 초 전`;
            } else if ((secondDate / 60 / 60) <= 1) {
                return `${ (secondDate / 60).toFixed(0) } 분 전`;
            } else if ((secondDate / 60 / 60 / 24) <= 1) {
                return `${ (secondDate / 60 / 60).toFixed(0) } 시간 전`;
            }
            return `${ startDateObject.getFullYear() }-${ startDateObject.getMonth() + 1 }-${ startDateObject.getDate() }`;
        } catch (e) {
            return '';
        }
    };

    handleClick = () => {
        this.props.history.push('/event/new');
    };

    render() {
        const { classes, users } = this.props;
        return (
            <React.Fragment>
                <Grid container xs={ 12 } spacing={ 24 }>
                    <Grid item xs={ 9 }>
                        { searchBar(classes, this) }
                        { listWrapper(classes, this.state.list, this) }
                        { this.state.list.length
                            ? <Grid container justify="center">
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        onClick={ this.nextPageSearch }
                                        disabled={ !this.state.isNext }
                                    >
                                        더보기
                                    </Button>
                                </Grid>
                            </Grid>
                            : <Card className={ classes.noData }>조회된 데이터가 없습니다.</Card>
                        }
                    </Grid>
                    <Grid item xs={ 3 }>
                        <HomeStatus/>
                        <Divider variant="middle" className={ classes['divider-margin']}/>
                        <MemberRank members={ this.props.aggsParticipations }/>
                    </Grid>
                </Grid>
                <Fab color="primary" aria-label="Add" className={ classes.fab } onClick={ this.handleClick }>
                    <AddIcon/>
                </Fab>
            </React.Fragment>
        );
    }
}

const mapStateToProps = storeState => ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated,
    users: storeState.users.data.docs,
    aggsParticipations: storeState.event.aggsParticipations.docs
});

const mapDispatchToProps = { getSession, getEvent, getUsers, getAggsParticipations };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
    mapStateToProps, mapDispatchToProps
)(withStyles(styles, { withTheme: true })(EventPage)));
