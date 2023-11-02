import { CoursePartListProps } from "../types";

const Total = (props: CoursePartListProps) => {
    return(
      <div>
        <h2>Number of exercises{" "}{props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}</h2>
      </div>
    )
};

export default Total;