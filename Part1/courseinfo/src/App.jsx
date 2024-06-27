/* eslint-disable react/prop-types */
const Header = (props) => {
  return (
    <>
      <h1>{props.course_name.name}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <p> {props.part} {props.exercises} </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]['name']} exercises={props.parts[0]['exercises']} />
      <Part part={props.parts[1]['name']} exercises={props.parts[1]['exercises']} />
      <Part part={props.parts[2]['name']} exercises={props.parts[2]['exercises']} />
    </div>
  )
}

const Total = (props) => {
  // console.log(props.parts[0]['exercises'])
  const num_excercises_1 = props.parts[0]['exercises']
  const num_excercises_2 = props.parts[1]['exercises']
  const num_excercises_3 = props.parts[2]['exercises']
  return (
    <>
      <p>Number of exercises {num_excercises_1 + num_excercises_2 + num_excercises_3}</p>

    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course_name={course} />

      <Content parts={course.parts} />

      <Total parts={course.parts} />
    </div>
  )
}

export default App