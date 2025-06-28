import Part from "./Part"
import type { CoursePart } from "../types"

interface ContentProps {
    courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {

    return (
        <div>
            {props.courseParts.map((coursePart: CoursePart) => (
                <Part key={coursePart.name} part={coursePart} />
            ))}
        </div>
    )
}

export default Content