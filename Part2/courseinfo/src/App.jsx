/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const Header = ({ course }) => <h2>{course}</h2>

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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>

      <h1>Web development curriculum</h1>
      {courses.map((course) => <Course course={course} key={course.id} />)}
      {/* <Course course={courses} /> */}
    </>

  )
}

export default App