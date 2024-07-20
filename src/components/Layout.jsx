import Nav from './Nav'

const Layout = ({ children }) => {
    return (
        <section className='w-full relative'>
            <div className='fixed top-0 left-0 min-h-screen w-[25%] bg-white dark:bg-slate-700'>
                <Nav />
            </div>
            <div className='dark:bg-slate-800 bg-primary min-h-screen w-[75%] ml-auto p-1 dark:text-white'>
                {children}
            </div>
        </section>
    )
}

export default Layout
