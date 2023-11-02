interface propsCourseParts {
    parts : {
        name: string;
        exerciseCount: number;
    } [];
} ;

const context = (props: propsCourseParts) => {
    return(
        <div>
        {props.parts.map(part => <p>{part.name} {part.exerciseCount}</p>)}
        </div>
    )
};

export default context;