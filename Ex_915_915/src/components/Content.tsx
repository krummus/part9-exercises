import { CoursePartListProps } from "../types";
import Part from './Part';

const Content = (data: CoursePartListProps) => {
    console.log(data.parts, 'reporting here 2')
    return(
      <div>
        {data.parts.map(part => <Part part={part} />)}
      </div>
    )
};

export default Content;