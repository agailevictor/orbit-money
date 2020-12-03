import React, { useEffect } from "react";
import { connect } from "react-redux";

import Select2 from "../Select2/Select2";
import ApiConstants from "../../shared/config/apiConstants";
import { callApi } from "../../services/apiService";
import { toastService } from "../../services/toastService";
import { ActionCreators } from "../../actions";

const OccupationList = (props) => {
    console.log('===================');
    console.log(props);
    useEffect(() => {
        if (props.groupId && props.occupationList && !props.occupationList[props.groupId]) {
            fetchOccupations(props.groupId);
        }
    }, [props.groupId]);

    const fetchOccupations = (value) => {
        callApi("get", ApiConstants.FETCH_OCCUPATIONS, { groupId: value })
            .then((response) => {
                if (response.code === 200) {
                    let occupationData = { ...props.occupationList, [props.groupId]: response.dataList };
                    props.setData(occupationData);
                } else toastService.error(response.message);
            })
            .catch((e) => {
                toastService.error(e.message);
            });
    };

    const renderOptions = (options) => {
        return options.map((option) => {
            return {
                value: option.id,
                label: option.title,
            };
        });
    };

    const occupationOptions = props.occupationList[props.groupId] ? renderOptions(props.occupationList[props.groupId]) : [];

    return (
        <React.Fragment>
            <Select2
                options={occupationOptions}
                value={occupationOptions.filter((option) => option.value === props.value)}
                className={props.className}
                placeholder={props.placeholder ? props.placeholder : "Occupation"}
                isSearchable={props.isSearchable}
                onChange={(event) => props.onChange(event)}
                error={props.error ? props.error : ""}
            />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        occupationList: state.lookupsReducer.occupationList,
    };
};

const mapDispatchToProps = (dispatch, getState) => {
    return {
        setData: (data) => dispatch(ActionCreators.occupationAction(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OccupationList);