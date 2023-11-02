interface exerciseCounts {
    parts: number [];
}

const total = (props: exerciseCounts) => {
    return(
        <p>Number of exercises{" "}
        {props.parts.reduce((carry, part) => carry + part, 0)} </p>
    )
}

export default total;