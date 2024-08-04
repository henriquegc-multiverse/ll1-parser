export class Stack<T> {
  private items: T[] = [];

  // Pushes an element onto the stack
  push(element: T): void {
    this.items.push(element);
  }

  // Pops an element off the stack and returns it
  pop(): T | undefined {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items.pop();
  }

  // Peeks at the top element of the stack without removing it
  peek(): T | undefined {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.items.length - 1];
  }

  // Checks if the stack is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Returns the size of the stack
  size(): number {
    return this.items.length;
  }

  // Clears the stack
  clear(): void {
    this.items = [];
  }
}

// Example usage:
