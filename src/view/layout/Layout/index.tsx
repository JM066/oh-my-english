import { PropsWithChildren } from 'react';

function Layout(props: PropsWithChildren) {
    return (
        <div
            className={`w-screen h-screen flex flex-col bg-transparent dark:bg-gray-900`}
        >
            {props.children}
        </div>
    );
}
export default Layout;
