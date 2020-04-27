import React, { useEffect, useReducer } from 'react';
import { Box, Grid, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from '@material-ui/core';


const initState = {
    amount: '0',
    fee: 0,
    cableFee: '',
    totalAmount: ''
};

const stateReducer = (state, action) => {

    const newState = { ...state };

    switch (action.type) {

        case 'UPDATE_TOTALAMOUNT':

            newState.totalAmount = action.payload;

            break;

        case 'UPDATE_CABLEFEE':

            newState.cableFee = action.payload;

            break;

        case 'RESET':

            newState.totalAmount = initState.totalAmount;
            newState.cableFee = initState.cableFee;

            break;

        case 'UPDATE':
        default:

    }

    const totalAmountTWD = +newState.totalAmount * +action.props.exrate;

    // 算手續費要先扣郵電費
    let fee = (totalAmountTWD - +newState.cableFee) / (1 + +action.props.feeRate) * +action.props.feeRate;

    if (fee > +action.props.maxFee) fee = +action.props.maxFee;
    if (fee < +action.props.minFee) fee = +action.props.minFee;

    newState.fee = fee;

    newState.amount = totalAmountTWD - +newState.cableFee - fee;

    return newState;

};

function Inverse (props) {

    const [state, dispatch] = useReducer(stateReducer, initState);
    
    useEffect(() => {

        dispatch({ type: 'UPDATE', props })

    }, [props]);

    const handleChange = (e, type) => dispatch({
        type, payload: e.target.value, props
    });

    const handleReset = () => dispatch({ type: 'RESET', props });
    
    return (

        <Box m={2}>
            <Grid
                container
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12} sm={12} md={12}>
                    <Box m={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-totalAmount">總收費金額</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-totalAmount"
                                type="number"
                                value={state.totalAmount}
                                onChange={(e) => handleChange(e, 'UPDATE_TOTALAMOUNT')}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                labelWidth={65}
                            />
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Box m={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-exrate">兌台幣匯率</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-exrate"
                                type="number"
                                value={props.exrate}
                                onChange={(e) => props.handleChange(e, 'UPDATE_EXRATE')}
                                labelWidth={80}
                            />
                            <FormHelperText>預設 1(台幣兌台幣), 美金約填 30, 以此類推</FormHelperText>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Box m={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-minFee">最低手續費金額</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-minFee"
                                type="number"
                                value={props.minFee}
                                onChange={(e) => props.handleChange(e, 'UPDATE_MINFEE')}
                                startAdornment={<InputAdornment position="start">NTD$</InputAdornment>}
                                labelWidth={115}
                            />
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Box m={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-maxFee">最高手續費金額</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-maxFee"
                                type="number"
                                value={props.maxFee}
                                onChange={(e) => props.handleChange(e, 'UPDATE_MAXFEE')}
                                startAdornment={<InputAdornment position="start">NTD$</InputAdornment>}
                                labelWidth={115}
                            />
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Box m={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-feeRate">手續費比例</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-feeRate"
                                type="number"
                                value={props.feeRate}
                                onChange={(e) => props.handleChange(e, 'UPDATE_FEERATE')}
                                labelWidth={80}
                            />
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Box m={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-cableFee">郵電費</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-cableFee"
                                type="number"
                                value={state.cableFee}
                                onChange={(e) => handleChange(e, 'UPDATE_CABLEFEE')}
                                startAdornment={<InputAdornment position="start">NTD$</InputAdornment>}
                                labelWidth={50}
                            />
                            <FormHelperText>一般 NTD$ 300, 全額 NTD$ 600</FormHelperText>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Box m={2}>
                        <strong>
                            匯款金額
                        </strong>
                        <br/>
                        <strong>NTD$ {Math.floor(+state.amount).toString().replace(/\d(?=(?:\d{3})+\b)/g, '$&,')}</strong>
                        &nbsp;or <strong>外幣$ {(Math.floor(+state.amount / +props.exrate * 100) / 100).toString().replace(/\d(?=(?:\d{3})+\b)/g, '$&,')}</strong>
                        <br/>
                        {
                            state.fee > 0
                                ? (
                                    <span>
                                        (另有手續費 <strong>NTD$ {Math.ceil(+state.fee)}</strong>
                                        &nbsp;or <strong>外幣$ {(Math.ceil(+state.fee / +props.exrate * 100) / 100)}</strong>)
                                    </span>
                                )
                                : null
                        }
                        
                    </Box>
                </Grid> 
                <Grid item xs={12} sm={12} md={12}>
                    <Box m={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => handleReset('RESET')}
                        >
                            重置
                        </Button>
                    </Box>
                </Grid> 
            </Grid>
        </Box>
        
    );
}

export default Inverse;
