const logoUrl = process.env.NEXT_PUBLIC_SUPABASE__LOGO_URL
const Logo = ({ className = '', ...props }) => <img alt="Logo" src={logoUrl} />

export default Logo
