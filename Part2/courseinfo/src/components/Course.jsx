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

export default Course