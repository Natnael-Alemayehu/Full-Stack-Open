/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <strong><p>Number of exercises {sum}</p></strong>

const Part = ({ part }) => {
  return (
    <p>

      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part
          part={part}
          key={part.id}
        />
      ))}
    </>
  )
}

const Course = (props) => {
  const parts = props.course.parts
  const list_exercise = parts.map((part) => part.exercises)

  const add = (accumulator, a) => accumulator + a
  const sum = list_exercise.reduce(add, 0)
  return (
    <>
      <Header course={props.course.name} />
      <Content parts={parts} />
      <Total sum={sum} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ]
  }

  return (
    <Course course={course} />

  )
}

export default App