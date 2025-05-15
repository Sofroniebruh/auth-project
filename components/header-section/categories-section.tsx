interface Props {
  items: Category[],
  className?: string
}

//TODO: CHANGE THE TYPE TO PRISMA TYPE

export type Category = {
  name: string,
}

export const CategoriesSection = ({ items, className }: Props) => {
  return (
    <div className={className}>
      <h1 className={'text-2xl text-blue-600'}>Categories you may like:</h1>
      <ul className={'text-xl mt-2.5'}>
        {
          items.map((category, index) => (
            <li key={index}>{category.name}</li>
          ))
        }
      </ul>
    </div>
  );
};