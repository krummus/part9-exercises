import { DiaryEntriesForProps } from "../types";

const Content = (props: DiaryEntriesForProps) => {
    return(
      <div>
        <h3>Diary Entries</h3>
        {props.entries.map(entry => {
          if(entry.comment) {
            return <div key={entry.date}><h4>{entry.date}</h4>
              <p>Weather: {entry.weather}<br />
              Visibility: {entry.visibility}<br />
              Comment: {entry.comment}</p>
              </div>
          }else{
            return <div key={entry.date}><h4>{entry.date}</h4>
              <p>Weather: {entry.weather}<br />
              Visibility: {entry.visibility}</p>
              </div>
          }}
        )}
      </div>
    )
};

export default Content;