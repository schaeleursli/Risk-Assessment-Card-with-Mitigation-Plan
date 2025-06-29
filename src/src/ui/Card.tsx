import React, { forwardRef } from 'react';
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
const Card = forwardRef<HTMLDivElement, CardProps>(({
  className,
  ...props
}, ref) => <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`} {...props} />);
Card.displayName = 'Card';
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({
  className,
  ...props
}, ref) => <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className || ''}`} {...props} />);
CardHeader.displayName = 'CardHeader';
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({
  className,
  ...props
}, ref) => <h3 ref={ref} className={`text-lg font-semibold leading-none tracking-tight ${className || ''}`} {...props} />);
CardTitle.displayName = 'CardTitle';
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(({
  className,
  ...props
}, ref) => <p ref={ref} className={`text-sm text-muted-foreground ${className || ''}`} {...props} />);
CardDescription.displayName = 'CardDescription';
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({
  className,
  ...props
}, ref) => <div ref={ref} className={`p-6 pt-0 ${className || ''}`} {...props} />);
CardContent.displayName = 'CardContent';
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({
  className,
  ...props
}, ref) => <div ref={ref} className={`flex items-center p-6 pt-0 ${className || ''}`} {...props} />);
CardFooter.displayName = 'CardFooter';
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };