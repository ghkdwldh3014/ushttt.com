# Contributing to UTTT Web

Thank you for your interest in contributing to UTTT Web! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Environment details (browser, OS, etc.)

### Suggesting Features

1. Check if the feature has been suggested in Issues
2. Create a new issue with:
   - Clear description of the feature
   - Use cases
   - Potential implementation approach
   - Any relevant examples

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests
5. Update documentation
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/uttt-web.git
cd uttt-web

# Add upstream remote
git remote add upstream https://github.com/original-owner/uttt-web.git

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types, avoid `any`
- Use interfaces for object shapes
- Document complex types

```typescript
// Good
interface UserProfile {
  id: string;
  username: string;
  rating: number;
}

// Avoid
const user: any = { ... };
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Document complex components

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

### File Structure

- One component per file
- Group related components in folders
- Use index.ts for exports
- Keep file names consistent

```
components/
├── Game/
│   ├── GameBoard.tsx
│   ├── GameTimer.tsx
│   └── index.ts
```

### Naming Conventions

- **Components**: PascalCase (`GameBoard.tsx`)
- **Functions**: camelCase (`calculateRating()`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_PLAYERS`)
- **Interfaces**: PascalCase with descriptive names (`UserProfile`)
- **Types**: PascalCase (`GameMode`)

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas
- Use meaningful variable names
- Keep functions small and focused
- Add comments for complex logic

```typescript
// Good
function calculateRatingChange(
  playerRating: number,
  opponentRating: number,
  result: number,
): number {
  const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  return Math.round(K_FACTOR * (result - expectedScore));
}

// Avoid
function calc(p: number, o: number, r: number): number {
  return Math.round(32 * (r - 1 / (1 + Math.pow(10, (o - p) / 400))));
}
```

## Git Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Adding tests

### Commit Messages

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

Examples:
```
feat(game): add STTT board component

fix(timer): correct time calculation in variants

docs(readme): update installation instructions
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react';
import { GameBoard } from './GameBoard';

describe('GameBoard', () => {
  it('renders empty board', () => {
    render(<GameBoard />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('handles move correctly', () => {
    const onMove = jest.fn();
    render(<GameBoard onMove={onMove} />);
    // ... test implementation
  });
});
```

## Documentation

- Update README.md for user-facing changes
- Update FEATURES.md for new features
- Update ARCHITECTURE.md for structural changes
- Add JSDoc comments for public APIs
- Include examples in documentation

```typescript
/**
 * Calculate the rating change for a game result.
 * 
 * @param playerRating - Current rating of the player
 * @param opponentRating - Current rating of the opponent
 * @param result - Game result (1 = win, 0.5 = draw, 0 = loss)
 * @returns The rating change (positive or negative)
 * 
 * @example
 * calculateRatingChange(2000, 2100, 1) // Returns ~16
 */
export function calculateRatingChange(
  playerRating: number,
  opponentRating: number,
  result: number,
): number {
  // ...
}
```

## Review Process

1. All PRs require at least one review
2. Address all review comments
3. Ensure CI passes
4. Keep PR scope focused
5. Update based on feedback

## License

By contributing, you agree that your contributions will be licensed under the project's license.

## Questions?

- Open an issue for questions
- Join our Discord community
- Contact the maintainers

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project website (coming soon)

Thank you for contributing to UTTT Web! 🎮
