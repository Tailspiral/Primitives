# TailSpiral Primitives

TailSpiral Settings Primitives is a collection of pre-designed building blocks and components for use with Tailspiral. This repository offers a wide range of UI primitives to be used to configure your components such as.

```jsx
import { Padding, RichText, Typography } from "@tailspiral/primitives";

type RichTextProps = {
  content: string;
  style: {
    color: string;
    fontSize: number;
    fontWeight: number;
    fontFamily: string;
  };
  connect: any;
};

const RichTextComponent = ({ style, connect, content }: RichTextProps) => {
  return <div style={style} {...connect} dangerouslySetInnerHTML={{ __html: content }} />;
};

export const Config = () => ({
  name: "RichText",
  description: "A RichText component",
  category: "Basic",
  settings: [
    <RichText propKey="content" label="Content" />, 
    <Padding />, 
    <Typography />],
});

export default RichTextComponent;

```
## Getting Started

### Installation

```bash
npm install @tailspiral/primitives
```
or 
```bash
yarn add @tailspiral/primitives
```

### Usage

```jsx
import { Padding, RichText, Typography } from "@tailspiral/primitives";


export const Config = () => ({
  name: "RichText",
  description: "A RichText component",
  category: "Basic",
  settings: [
    <RichText propKey="content" label="Content" />, 
    <Padding />, 
    <Typography />],
});

```



