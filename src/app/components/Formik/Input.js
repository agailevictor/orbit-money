import React from 'react'
import { Form } from 'react-bootstrap'
import { withTranslation } from "react-i18next";

function Input({handleChange, values, errors, name, placeholder, t}) {
    return (
        <div className="form-group">  
            <label className="text-dark"><b>{ t("AddMoney.Direct_Debit."+name) }</b></label>
            <Form.Control
                type="text"
                placeholder={placeholder}
                name={name}
                value={values[name]}
                onChange={handleChange}
                isInvalid={!!errors[name]}
            />
            <Form.Control.Feedback type="invalid">
                {errors[name]}
            </Form.Control.Feedback>
        </div>
    );
}

export default withTranslation()(Input);