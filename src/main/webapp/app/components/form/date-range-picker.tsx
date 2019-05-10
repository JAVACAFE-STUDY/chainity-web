import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

const styles = theme =>
    createStyles({
        grid: {
            width: '30%'
        }
    });

export interface IDateRangePickerProp {
    classes?: any;
    onChange: any;
}

class DateRangePicker extends React.PureComponent<IDateRangePickerProp> {

    state = {
        selectedStartDate: null,
        selectedEndDate: null
    };

    handleDateChange = type => e => {
        switch (type) {
            case 'start':
                this.props.onChange({ value: [ e, this.state.selectedEndDate ] });
                this.setState({ selectedStartDate: e });
                break;
            case 'end':
                this.props.onChange({ value: [ this.state.selectedEndDate, e ] });
                this.setState({ selectedEndDate: e });
                break;
            default:
                break;
        }
    };

    render() {
        const { classes } = this.props;
        const { selectedStartDate, selectedEndDate } = this.state;

        return (
            <div>
                <Grid container className={ classes.grid } justify="space-around">
                    <MuiPickersUtilsProvider utils={ DateFnsUtils }>
                        <DatePicker
                            margin="normal"
                            label={ '시작일' }
                            value={ selectedStartDate }
                            onChange={ this.handleDateChange('start') }
                        />
                        <DatePicker
                            margin="normal"
                            minDate={ selectedStartDate }
                            label={ '종료일' }
                            value={ selectedEndDate }
                            onChange={ this.handleDateChange('end') }
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(DateRangePicker);
