import type { CoursePart } from "../types.ts"


interface PartProps {
    part: CoursePart
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
    const part = props.part;

    switch (part.kind) {
        case "basic":
            return <p>{part.name} {part.exerciseCount} {part.description}</p>

        case "group":
            return <p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>

        case "background":
            return <p>{part.name} {part.exerciseCount} {part.description} {part.backgroundMaterial}</p>

        case "special":
            return <p>{part.name} {part.exerciseCount} {part.description} {part.requirements}</p>
        default:
            return assertNever(part)
    }
}

export default Part