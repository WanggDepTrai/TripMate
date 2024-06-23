import { useEffect, useRef, useState, type ElementType } from 'react';

export const useSvgIcon = (name: string) => {
   const importedIconRef = useRef<ElementType>();
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<Error>();
console.log(process.env.NODE_ENV);
   useEffect(() => {
      setIsLoading(true);

      const importSvgIcon = async (): Promise<void> => {
         try {
            const svgIcon =
               process.env.NODE_ENV === 'production'
                  ? await import(`./${name}.svg`)
                  : await import(`../assets/icons/${name}.svg`);

            const { ReactComponent } = svgIcon as {
               ReactComponent: ElementType;
            };

            importedIconRef.current = ReactComponent;
         } catch (err) {
            if (err instanceof Error) {
               setError(err);
            }
         } finally {
            setIsLoading(false);
         }
      };

      void importSvgIcon();
   }, [name]);

   return { error, isLoading, Icon: importedIconRef.current };
};
