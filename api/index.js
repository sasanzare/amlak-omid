export const BASE_URL = 'http://localhost:3000/api'
export const STATICS = `${BASE_URL}/static/uploads/`
export const AdvisorRegistreApi = `${BASE_URL}/auth/register/moshaver`
export const RealStateRegistrationApi = `${BASE_URL}/auth/register/amlak`
export const PhoneNamberApi = `${BASE_URL}/auth/sendVerificationCode`
export const authenticationApi = `${BASE_URL}/auth`
export const ArticlesApi = `${BASE_URL}/articles`
export const ContactApi = `${BASE_URL}/contact`
export const NewsApi = `${BASE_URL}/property/add`
export const PropertiesApi = `/api/properties`
export const SinglePropertyApi = (id) => `${BASE_URL}/properties/single?id=${id}`
export const SingleBlogApi = (normalName) => `${BASE_URL}/articles/single?normalName=${normalName}`
