# Contributing to PokéAPI Explorer

Thank you for your interest in contributing to PokéAPI Explorer! This project aims to make learning about APIs fun and accessible through interactive Pokémon data exploration.

## 🎯 Project Goals

- **Educational First**: Every feature should help users learn about APIs, HTTP, JSON, or web development
- **Beginner Friendly**: Code should be readable and well-documented for learning purposes
- **Interactive Learning**: Features should encourage hands-on exploration and discovery
- **Accessible**: The app should work well for users of all technical levels

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Git
- Basic knowledge of React and TypeScript

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/pokeapi-explorer.git
   cd pokeapi-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🛠️ Development Guidelines

### Code Style
- **TypeScript**: Use TypeScript for all new code
- **Functional Components**: Use React hooks instead of class components
- **Tailwind CSS**: Use Tailwind classes for styling
- **ESLint**: Follow the existing ESLint configuration
- **Comments**: Add comments for complex logic, especially educational features

### Component Structure
```typescript
// Good component structure
interface ComponentProps {
  // Define props with clear types
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks at the top
  const [state, setState] = useState();
  
  // Helper functions
  const handleSomething = () => {
    // Implementation
  };
  
  // Render
  return (
    <div className="tailwind-classes">
      {/* JSX */}
    </div>
  );
};

export default Component;
```

### Educational Features
When adding educational content:
- **Clear explanations**: Use simple language and real-world analogies
- **Progressive disclosure**: Start simple, add complexity gradually
- **Interactive elements**: Make concepts clickable and explorable
- **Visual feedback**: Use animations and highlights to guide attention

## 📝 Types of Contributions

### 🎨 UI/UX Improvements
- Better responsive design
- Improved animations and transitions
- Enhanced accessibility features
- Better loading states and error handling

### 📚 Educational Content
- New lessons in the education modal
- Better explanations of API concepts
- More interactive examples
- Additional learning resources

### 🔧 New Features
- Pokemon comparison tools
- Favorites system
- Team builder functionality
- Advanced search and filtering
- Data visualization features

### 🐛 Bug Fixes
- Fix responsive design issues
- Improve error handling
- Performance optimizations
- Cross-browser compatibility

### 📖 Documentation
- Improve README
- Add code comments
- Create tutorials
- API documentation examples

## 🔄 Pull Request Process

### Before You Start
1. **Check existing issues** to avoid duplicate work
2. **Create an issue** for new features to discuss approach
3. **Fork the repository** and create a feature branch

### Making Changes
1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the code style guidelines
   - Add comments for educational value
   - Test your changes thoroughly

3. **Test your changes**
   ```bash
   npm run build  # Ensure it builds
   npm run lint   # Check for linting errors
   ```

4. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of changes"
   ```
   
   Use conventional commit messages:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for improvements
   - `Docs:` for documentation

### Submitting Your PR
1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request**
   - Use a clear, descriptive title
   - Explain what your changes do
   - Include screenshots for UI changes
   - Reference any related issues

3. **PR Description Template**
   ```markdown
   ## What does this PR do?
   Brief description of changes
   
   ## Type of change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Educational content
   - [ ] Documentation update
   
   ## Testing
   - [ ] Tested locally
   - [ ] Responsive design checked
   - [ ] Educational value verified
   
   ## Screenshots (if applicable)
   Add screenshots here
   ```

## 🎓 Educational Contribution Guidelines

### Adding New Lessons
When contributing to the education modal:

1. **Structure**: Follow the existing lesson format
2. **Progression**: Build on previous concepts
3. **Interactivity**: Include hands-on examples
4. **Analogies**: Use real-world comparisons
5. **Visuals**: Add diagrams or code examples

### Example Lesson Structure
```typescript
{
  id: 'lesson-id',
  title: 'Lesson Title',
  icon: <IconComponent />,
  content: (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3>Main Concept</h3>
        <p>Clear explanation with analogy</p>
      </div>
      
      {/* Interactive Examples */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Examples */}
      </div>
      
      {/* Practice Section */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4>Try This!</h4>
        <p>Hands-on activity</p>
      </div>
    </div>
  )
}
```

## 🚨 Issue Reporting

### Bug Reports
Include:
- **Description**: What happened vs. what you expected
- **Steps to reproduce**: Detailed steps
- **Environment**: Browser, OS, device
- **Screenshots**: If applicable

### Feature Requests
Include:
- **Problem**: What problem does this solve?
- **Solution**: Proposed solution
- **Educational value**: How does this help learning?
- **Alternatives**: Other solutions considered

## 📋 Code Review Process

### What We Look For
- **Code quality**: Clean, readable, well-structured
- **Educational value**: Does it help users learn?
- **Performance**: No unnecessary re-renders or API calls
- **Accessibility**: Works with screen readers, keyboard navigation
- **Responsive**: Works on mobile and desktop

### Review Timeline
- **Initial response**: Within 2-3 days
- **Full review**: Within 1 week
- **Feedback incorporation**: Ongoing discussion

## 🌟 Recognition

Contributors will be:
- **Listed in README**: All contributors are acknowledged
- **GitHub contributors page**: Automatic recognition
- **Special mentions**: For significant contributions

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Code Comments**: For implementation questions

## 🎉 Thank You!

Every contribution, no matter how small, helps make learning about APIs more accessible and fun. Thank you for being part of this educational project!

---

**Happy coding! 🚀**