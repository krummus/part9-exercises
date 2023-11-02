interface HeaderProps {
    title: string;
}

const header = (props: HeaderProps) => {
    return <h1>{props.title}</h1>;
}

export default header;