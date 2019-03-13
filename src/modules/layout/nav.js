import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


export default (
    <Grid container spacing={12}>
        <Grid item xs={3}>
            Grid1
        </Grid>
        <Grid item xs={6}>
            Grid2
        </Grid>
        <Grid item xs={3}>
            Grid3
        </Grid>
    </Grid>
);