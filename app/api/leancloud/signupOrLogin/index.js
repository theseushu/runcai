export default ({ AV, updateContextToken }) => {
  const success = (user) => {
    const { sessionToken, objectId, mobilePhoneNumber } = user;
    updateContextToken({ objectId, sessionToken, mobilePhoneNumber });
    return ({
      sessionToken,
      objectId,
      mobilePhoneNumber,
    });
  };
  const error = (err) => {
    updateContextToken({});
    throw err;
  };

  const loginWithPassword = (phone, password) => AV.Cloud.rpc('loginWithPassword', { phone, password }).then(success).catch(error);
  const signupOrLoginWithMobilePhone = (phone, smsCode, attributes) => AV.Cloud.rpc('signupOrLoginWithMobilePhone', { phone, smsCode, attributes }).then(success).catch(error);
  return {
    loginWithPassword,
    signupOrLoginWithMobilePhone,
  };
};
