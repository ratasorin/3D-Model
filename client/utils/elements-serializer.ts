import React, { ReactElement, ReactNode } from 'react';

export function serialize(element: ReactNode) {
  const replacer = (key: string, value: unknown) => {
    switch (key) {
      case '_owner':
      case '_store':
      case 'ref':
      case 'key':
        return;
      default:
        return value;
    }
  };

  return JSON.stringify(element, replacer);
}

export function deserialize(data: string | Object) {
  console.log(data);
  if (typeof data === 'string') {
    data = JSON.parse(data);
  }
  if (data instanceof Object) {
    return deserializeElement(data as ReactElement);
  }
  //   throw new Error('Deserialization error: incorrect data type');
}

function deserializeElement(
  element: ReactElement,
  key?: number
): ReactElement | ReactElement[] {
  if (typeof element !== 'object') {
    return element as ReactElement;
  }

  if (element === null) {
    return element;
  }

  if (element instanceof Array) {
    return element.map((el, i) => deserializeElement(el, i)) as ReactElement[];
  }

  let { type, props } = element;
  console.log(type, props);

  if (typeof type !== 'string') {
    throw new Error('Deserialization error: element type must be string');
  }

  if (props.children) {
    props = { ...props, children: deserializeElement(props.children) };
  }

  return React.createElement(type, { ...props, key });
}
