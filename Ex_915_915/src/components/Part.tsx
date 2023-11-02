import { CoursePartProps } from "../types"

const Part = (props: CoursePartProps) => {
    switch(props.part.kind) {
      case "basic": return (<div><h3 key={props.part.name}>{props.part.name}</h3> <p>{props.part.exerciseCount}</p> <p>{props.part.description}</p></div>);
      case "group": return (<div><h3 key={props.part.name}>{props.part.name}</h3> <p>{props.part.exerciseCount}</p> <p>{props.part.groupProjectCount}</p></div>);
      case "background": return (<div><h3 key={props.part.name}>{props.part.name}</h3> <p>{props.part.exerciseCount}</p> <p>{props.part.description}</p> <p>{props.part.backgroundMaterial}</p></div>);
      case "special": return (<div><h3 key={props.part.name}>{props.part.name}</h3> <p>{props.part.exerciseCount}</p> <p>{props.part.description}</p> {props.part.requirements.map(req=><p>{req}</p>)}</div>)
      default: return (<div><p></p></div>);
  }
} 

export default Part;