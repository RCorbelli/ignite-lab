import classNames from "classnames";
import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";


interface SideBarProps {
    isOpen: boolean;
}

export function Sidebar(props: SideBarProps){
    const {data} = useGetLessonsQuery();
    return(
        <aside className={classNames({
            "w-[348px] bg-gray-700 p-6 border-l border-gray-600": !props.isOpen,
            "absolute h-full top-0 right-0 z-50 w-[348px] bg-gray-700 p-6 border-l border-gray-600": window.innerWidth < 700 && props.isOpen,
            "hidden":window.innerWidth < 700 && !props.isOpen
        })}>
            <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
                Cronograma de aulas
            </span>
            <div className="flex flex-col gap-8">
                {data?.lessons.map(lesson => {
                    return(
                        <Lesson
                            key={lesson.id}
                            title={lesson.title}
                            slug={lesson.slug}
                            availableAt={new Date(lesson.availableAt)}
                            type={lesson.lessonType}
                        />
                    );
                })}
            </div>
        </aside>
    );
}