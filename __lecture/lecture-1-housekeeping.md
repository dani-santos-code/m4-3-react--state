# 4.3.1 React State

---

## 🏠Housekeeping: Composing styles

Is there a better way to write this?

```js live=true
const Button = styled.button`
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  background: #EEE;
`;

// we can extend a component like so:
const BlueButton = styled(Button)`
  background: #2B00D7;
  color: #FFF;
`

render(<>
  <Button>Button 1</Button>
  <BlueButton>Button 2</BlueButton>
</>)
```

---

## Exercise

What does the `&` signify, in this snippet?


```jsx
// you are adding a pseudo-selector with a shorthand
// last element of its parent

const ListItem = styled.li`
  border-bottom: 1px solid;

  &:last-of-type {
    border-bottom: none;
  }
`
```

---
