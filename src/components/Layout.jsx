import Nav from './Nav'

const Layout = ({ children }) => {
    return (
        <section className='w-full relative'>
            <div className='fixed top-0 left-0 min-h-screen w-[25%] bg-white/30 '>
                <Nav />
            </div>
            <div className='bg-primary min-h-screen w-[75%] ml-auto p-1'>
                {children}
            </div>
        </section>
    )
}

export default Layout
