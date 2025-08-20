import {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  Fragment,
  Dispatch,
  SetStateAction,
  ReactNode,
  ElementType,
} from 'react';

interface TransitionContextProps {
  parent: {
    show: boolean;
    appear?: boolean;
    isInitialRender?: boolean;
  };
}

const TransitionContext = createContext<TransitionContextProps>({
  parent: {
    show: false,
    appear: false,
    isInitialRender: true,
  },
});

function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

export interface TransitionProps {
  as?: ElementType;
  show?: boolean;
  appear?: boolean;
  unmount?: boolean;
  children: ReactNode;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}

export function Transition({
  as = 'div',
  show = true,
  appear = false,
  unmount = true,
  children,
  ...props
}: TransitionProps) {
  const Component = as === 'div' ? 'div' : as;
  const isInitialRender = useIsInitialRender();
  const [state, setState] = useState(show ? 'enter' : 'exit');

  useEffect(() => {
    if (isInitialRender) return;
    setState(show ? 'enter' : 'exit');
  }, [show, isInitialRender]);

  if (unmount && state === 'exit') return null;

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          appear,
          isInitialRender,
        },
      }}
    >
      <Component {...props}>{children}</Component>
    </TransitionContext.Provider>
  );
}

interface TransitionChildProps {
  as?: ElementType;
  children: ReactNode;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  appear?: boolean;
  unmount?: boolean;
  [key: string]: any;
}

Transition.Child = function TransitionChild({
  as = 'div',
  children,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  appear = false,
  unmount = true,
  ...props
}: TransitionChildProps) {
  const Component = as;
  const { parent } = useContext(TransitionContext);
  const [state, setState] = useState(parent.show ? 'enter' : 'exit');
  const [displayState, setDisplayState] = useState(state);
  const [styles, setStyles] = useState<string>('');

  const initialRef = useRef(false);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialRef.current) return;
    initialRef.current = true;
    
    if (!parent.show) return;
    
    setDisplayState('enter');
    setStyles(`${enter} ${enterFrom}`);
    
    const timer = setTimeout(() => {
      setStyles(`${enter} ${enterTo}`);
    }, 10);
    
    return () => clearTimeout(timer);
  }, [enter, enterFrom, enterTo, parent.show]);

  useEffect(() => {
    if (parent.isInitialRender) return;
    
    if (state === 'enter' && parent.show) {
      setDisplayState('enter');
      setStyles(`${enter} ${enterFrom}`);
      
      const timer = setTimeout(() => {
        setStyles(`${enter} ${enterTo}`);
      }, 10);
      
      return () => clearTimeout(timer);
    }
    
    if (state === 'exit' || !parent.show) {
      setDisplayState('exit');
      setStyles(`${leave} ${leaveFrom}`);
      
      const timer = setTimeout(() => {
        setStyles(`${leave} ${leaveTo}`);
        
        const nextTimer = setTimeout(() => {
          setStyles('');
        }, 300); // Match your transition duration
        
        return () => clearTimeout(nextTimer);
      }, 10);
      
      return () => clearTimeout(timer);
    }
  }, [state, parent.show, parent.isInitialRender, enter, enterFrom, enterTo, leave, leaveFrom, leaveTo]);

  useEffect(() => {
    if (parent.isInitialRender) return;
    setState(parent.show ? 'enter' : 'exit');
  }, [parent.show, parent.isInitialRender]);

  if (unmount && displayState === 'exit' && !styles.includes(leave)) return null;

  return (
    <div ref={transitionRef} className={styles} {...props}>
      {typeof children === 'function' ? children({ state: displayState }) : children}
    </div>
  );
};

interface DialogProps {
  as?: ElementType;
  open?: boolean;
  onClose: () => void;
  [key: string]: any;
}

export function Dialog({
  as = 'div',
  open = true,
  onClose,
  children,
  ...props
}: DialogProps) {
  const Component = as;
  
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);
  
  return (
    <Transition as={Fragment} show={open} {...props}>
      {children}
    </Transition>
  );
}

Dialog.Panel = function DialogPanel({ className = '', ...props }) {
  return <div className={`${className}`} {...props} />;
};

Transition.Root = Transition;