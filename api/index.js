export const STATICS = `api/static/uploads/`
export const AdvisorRegistreApi = `api/auth/register/moshaver`
export const RealStateRegistrationApi = `api/auth/register/amlak`
export const PhoneNamberApi = `api/auth/sendVerificationCode`
export const authenticationApi = `api/auth`
export const ArticlesApi = `api/articles`
export const ContactApi = `api/contactForm/post`
export const NewsApi = `api/property/add`
export const PropertiesApi = `/api/properties`
export const SinglePropertyApi = (id) => `api/properties/single?id=${id}`
export const SingleBlogApi = (normalName) => `api/articles/single?normalName=${normalName}`
export const getAgencyInfoApi = `/api/agency`
export const getUsersApi = `/api/user`
export const upsertUser = `/api/user/post`
export const removeUser = `/api/user/remove`