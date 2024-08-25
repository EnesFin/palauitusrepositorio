interface HeaderProps {
  name: string;
}

interface TotalProps {
  total: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CourseDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CourseDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CourseDescription {
  requirements: Array<string>;
  kind: 'special';
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
interface CourseContentProps {
  parts: Array<CoursePart>;
}

interface PartProps {
  part: CoursePart;
}

const Header = ({ name }: HeaderProps) => {
  return <h1>{name}</h1>;
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>{part.description}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>{part.description}</p>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      );
    case 'group':
      return (
        <div>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
      );
    default:
      return <></>;
  }
};

const Content = (props: CourseContentProps) => {
  console.log(props);
  return (
    <>
      {props.parts.map((p) => (
        <Part key={p.name} part={p} />
      ))}
    </>
  );
};

const Total = (props: TotalProps) => {
  return <p> Number of exercises {props.total}</p>;
};

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial: 'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special',
    },
  ];
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={total} />
    </div>
  );
};

export default App;
