import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { certTypes } from 'funong-common/lib/appConstants';
import { actions } from 'api/cert';
import expertCertForm from './form';
import { expert } from '../selectors';

const createCert = actions.create;
const updateCert = actions.update;

const DEFAULT = {
  desc: '',
  images: [],
};

export default (cert) => reduxForm({
  form: 'personalCert',  // a unique identifier for this form
  initialValues: cert ? {
    desc: cert.fields.desc,
    images: cert.images,
  } : DEFAULT,
})(connect(
  (state) => ({ cert: expert(state) }),
  (dispatch) => ({
    onSubmit: ({ desc, images }) => new Promise((resolve, reject) => {
      const params = { type: certTypes.expert.value, fields: { desc }, images, meta: { resolve, reject: (err) => reject(new SubmissionError({ _error: { code: err.code, message: err.message } })) } };
      if (cert) {
        dispatch(updateCert({ objectId: cert.objectId, ...params }));
      } else {
        dispatch(createCert(params));
      }
    }),
  })
)(expertCertForm));
