/* tslint:disable:ter-arrow-body-style */
import './event.css';
import { Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { BlurCircular } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { createStyles, withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface IEventList {
    totalDocs: Number;
    offset: Number;
    limit: Number;
    docs: IEventListItem[];
}

interface IEventListItem {
    _id: String;
    title: String;
    description: String;
    tokens: Number;
    maxNumberOfParticipants: Number;
    startDate: String;
    endDate: String;
    isClosed: String;
    createdAt: String;
    createdBy: String;
}

interface IEventListParam {
    offset: Number;
    limit: Number;
    keyword?: String;
}

interface IEventListState {
    data?: IEventList;
    nowDate: Date;
    list?: IEventListItem[];
    isNext?: Boolean;
    param: IEventListParam;
}

const styles = theme =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing.unit * 2,
            textAlign: 'center',
            color: theme.palette.text.secondary
        },
        input: {
            marginLeft: 8,
            flex: 1
        },
        iconButton: {
            padding: 10
        },
        listItem: {
            height: '300px',
            margin: '20px 0',
            padding: '20px'
        },
        listItemTitle: {
            'font-size': '1.5em',
            margin: '20px 10px'
        },
        listItemContent: {
            display: '-webkit-box',
            overflow: 'hidden',
            'text-overflow': 'ellipsis',
            '-webkit-line-clamp': 4,
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
            padding: '0 5px'
        },
        listItemStartDate: {
            display: 'inline',
            padding: '0 5px'
        }
    });


const stateParamToParam = (param: IEventListParam) => {
    return Object.keys(param).reduce((pv, cv) => {
        if (param[ cv ]) {
            Object.assign(pv, { [ cv ]: param[ cv ] });
        }
        return pv;
    }, {});
};

export class EventPage extends React.Component<null, IEventListState> {
    constructor(props: Readonly<null>) {
        super(props);
        this.state = {
            param: {
                limit: 3,
                offset: 1
            },
            nowDate: new Date(),
            list: []
        };
        this.clickSearch = this.clickSearch.bind(this);
        this.changeEvent = this.changeEvent.bind(this);
        this.enterEvent = this.enterEvent.bind(this);
        this.calcDate = this.calcDate.bind(this);
        this.nextPageSearch = this.nextPageSearch.bind(this);
        this.scrollEvent = this.scrollEvent.bind(this);
    }

    componentDidMount(): void {
        window.addEventListener('scroll', this.scrollEvent);
    }

    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.scrollEvent);
    }

    scrollEvent() {
        if ((window.scrollY + window.innerHeight) === document.body.offsetHeight) {
            this.nextPageSearch();
        }
    }

    clickSearch() {
        this.setState({
            ...this.state,
            param: {
                ...this.state.param,
                offset: 1
            },
            list: []
        });
        this.search();
    }

    async search() {
        const res = await axios.get('/v1/groups/1/events', {
            params: {
                ...stateParamToParam(this.state.param)
            }
        });
        this.setState({
            ...this.state,
            isNext: (res.data.limit + res.data.offset) < res.data.totalDocs,
            data: res.data,
            list: res.data.docs.reduce((previousValue, currentValue) => {
                previousValue.push(currentValue);
                return previousValue;
            }, this.state.list)
        });
    }

    enterEvent(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            this.clickSearch();
        }
    }

    nextPageSearch() {
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
    }

    changeEvent(e) {
        this.setState({
            ...this.state,
            param: {
                limit: this.state.param.limit,
                offset: this.state.param.offset,
                keyword: e.target.value
            }
        });
    }

    calcDate(regDate: String) {
        const regDateObject = new Date(regDate) || new Date();
        const secondDate = (this.state.nowDate - regDateObject) / 1000;
        if ((secondDate / 60) <= 1) {
            return `${(secondDate).toFixed(0)} 초 전`;
        } else if ((secondDate / 60 / 60) <= 1) {
            return `${(secondDate / 60).toFixed(0)} 분 전`;
        } else if ((secondDate / 60 / 60 / 24) <= 1) {
            return `${(secondDate / 60 / 60).toFixed(0)} 시간 전`;
        }
        return `${regDateObject.toLocaleString('ko-kr', {
            year: 'numeric', month: 'long', day: 'numeric'
        })}`;
    }

    render() {
        const { account, classes } = this.props;
        return (
            <>
                <Grid container spacing={ 24 }>
                    <Grid item xs={ 9 }>
                        <Paper className={ classes.paper }>
                            <FormControl fullWidth>
                                <Input
                                    className={ classes.input } placeholder="이벤트 검색 키워드를 입력해주세요."
                                    onChange={ this.changeEvent }
                                    onKeyUp={ this.enterEvent }
                                    endAdornment={
                                        <IconButton className={ classes.iconButton } aria-label="Search">
                                            <SearchIcon
                                                onClick={ this.clickSearch }
                                            />
                                        </IconButton>
                                    }
                                />
                            </FormControl>
                        </Paper>
                        <Paper>
                            <List>
                                {
                                    this.state.list.length ?
                                        this.state.list.map((event, index) => {
                                                return (
                                                    <Link to={ `/event/detail/${event._id}` } key={ index }>
                                                        <Card
                                                            className={ classes.listItem }
                                                        >
                                                            <Typography component="p" className={ classes.listItemTitle }>
                                                                { event.title }
                                                            </Typography>
                                                            <Typography className={ classes.listItemContent }>
                                                                { event.description }
                                                            </Typography>
                                                            <BlurCircular className={ classes.listItemCoinIcon }/>
                                                            <Typography component="span"
                                                                        className={ classes.listItemTokens }>
                                                                { event.tokens }
                                                            </Typography>
                                                            <Typography component="span"
                                                                        className={ classes.listItemStartDate }>
                                                                { this.calcDate(event.startDate) }
                                                            </Typography>
                                                        </Card>
                                                    </Link>
                                                );
                                            }
                                        )
                                        : <></>
                                }
                            </List>
                            { this.state.list.length ?
                                <Button onClick={ this.nextPageSearch } disabled={ !this.state.isNext }>더보기</Button> : (
                                    <Card>No Data</Card>) }
                        </ Paper>
                    </ Grid>
                </ Grid>
            </ >
        );
    }
}

export default withStyles(styles)(EventPage);
