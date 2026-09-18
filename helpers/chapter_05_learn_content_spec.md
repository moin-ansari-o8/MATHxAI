# Chapter 05 — LEARN
## Content, Layout, Interactions & Implementation Specification

---

## 1. Chapter Purpose

Chapter 05 is where the learner discovers how calculus becomes a mechanism for improving an AI model.

Chapter 04 establishes:

> The model made a mistake. We can measure how wrong it was.

Chapter 05 answers:

> **How does the model know which direction to change to make that mistake smaller?**

The chapter should make the learner experience the progression rather than memorize calculus:

```text
FUNCTION
   ↓
CHANGE
   ↓
SLOPE
   ↓
DERIVATIVE
   ↓
PARTIAL DERIVATIVES
   ↓
GRADIENT
   ↓
GRADIENT DESCENT
```

Topic order:

```text
5.1 Functions
5.2 Change
5.3 Slope
5.4 Derivatives
5.5 Partial Derivatives
5.6 Gradients
5.7 Gradient Descent
```

---

# 2. Global Content & UX Principles

The chapter must support the site's core goals:

### Interactive Visualizations
**See mathematical concepts come to life.**

### Hands-on Experiments
**Adjust parameters and see what happens.**

### Real AI Examples
**Connect theory to real applications.**

### For Everyone
Assume the learner has no calculus or ML background.

Rules:

- Every visual must answer a specific question.
- Every interaction must have a meaningful mathematical effect.
- Show intuition before formal notation.
- Avoid formula-dumping.
- Let users manipulate graphs, points, sliders, and parameters.
- Update values and visualizations live.
- Clearly explain what each control means.
- Reuse concepts from previous chapters.
- Keep the neo-brutalist / playful visual language.
- Prefer visual cause → effect explanations over long paragraphs.
- Always answer: **"Why does AI need this?"**

---

# 3. Topic 5.1 — Functions

## Learning goal

The learner should understand:

> **A function takes an input and produces an output.**

## Intro explanation

Use:

```text
INPUT
  ↓
FUNCTION
  ↓
OUTPUT
```

Example:

\[
f(x)=2x+3
\]

For:

\[
x=4
\]

then:

\[
f(4)=11
\]

## Main Interactive Visualization — Function Machine

Create a visual function machine:

```text
┌─────────────────┐
│   FUNCTION      │
│                 │
│   × 2 + 3       │
└─────────────────┘

Input: 4
   ↓
Output: 11
```

Give the learner an input slider:

```text
x
──────●────────
```

As `x` changes, update the output immediately.

Allow switching between simple functions:

```text
[ 2x + 3 ]
[ x² ]
[ 3x - 1 ]
```

The equation, output, and graph should update together.

## Synchronized visual

Show:

```text
Input → Equation → Output
```

Example:

```text
x = 5

f(x) = 2x + 3

f(5) = 13
```

Highlight the corresponding point on the graph.

## Real AI connection

Explain:

> A prediction model can be viewed as a function. It takes inputs and produces an output.

```text
Features
   ↓
Model / Function
   ↓
Prediction
```

This is the first direct bridge from calculus to machine learning.

---

# 4. Topic 5.2 — Change

## Learning goal

The learner should understand:

> **We can measure how much an output changes when an input changes.**

Use:

\[
y=2x
\]

Example:

```text
x: 1 → 2
y: 2 → 4
```

Then introduce:

\[
\Delta x = +1
\]

\[
\Delta y = +2
\]

## Main Interactive Visualization — Change Explorer

Show two points on a graph:

```text
      B ●
       /
      /
     /
 A ●
──────────────→
```

The learner can drag either point.

Display live values:

```text
Change in x: +2
Change in y: +4
```

## Hands-on experiment

Start with:

```text
Point A
x = 2
y = 4

Point B
x = 5
y = 10
```

Ask:

> How much did x change?

Then:

> How much did y change?

Then:

> How quickly did y change compared with x?

The final question naturally introduces slope.

## Real AI connection

Explain:

> In machine learning, we care about how outputs change when model parameters change.

This is the first hint of the learning mechanism.

---

# 5. Topic 5.3 — Slope

## Learning goal

The learner should understand:

> **Slope tells us how much the output changes for a given change in the input.**

Introduce:

\[
\text{slope}=\frac{\Delta y}{\Delta x}
\]

Example:

\[
\frac{6}{3}=2
\]

## Main Interactive Visualization — Slope Slider

Show a line:

```text
y
↑
|        /
|      /
|    /
|  /
|_/____________→ x
```

Slider:

```text
Slope
──────●────────
```

As the learner moves the slider:

- the line becomes steeper or flatter;
- the numeric slope updates;
- the visual changes immediately.

Show examples:

```text
Slope = 0.5
Slope = 1
Slope = 2
Slope = -1
```

## Make negative slope meaningful

Show:

```text
Positive slope
    /

Zero slope
    ─────

Negative slope
    \
```

Explain:

> The sign tells us the direction of change.

## Hands-on experiment

Place a movable point on a curve.

Ask:

> Is the graph increasing or decreasing here?

Then:

> Is it changing slowly or quickly?

This prepares the learner for the idea that slope can change from point to point.

## Real AI connection

Explain:

> In machine learning, the rate at which a quantity changes can tell us how sensitive an output is to a small parameter change.

---

# 6. Topic 5.4 — Derivatives

## Learning goal

The learner should understand:

> **A derivative tells us the rate of change at a specific point.**

The conceptual difference:

```text
Slope
→ change over an interval

Derivative
→ instantaneous rate of change at a point
```

## Main Interactive Visualization — Tangent Line Explorer

Use a smooth curve:

```text
y
↑
|          ___
|       __/
|    __/
|___/
└────────────────→ x
```

Place a draggable point on the curve.

At that point, draw a tangent line.

When the learner moves the point:

- tangent rotates;
- derivative value changes;
- the graph updates.

Display:

```text
x = 2.4
Derivative = 3.17
```

## Key animation — Secant to Tangent

Start with two points:

```text
A ●────────● B
```

Move B closer:

```text
A ●────● B
```

Then:

```text
A ●─● B
```

Finally show the tangent at A.

The learner should visually understand that the local slope emerges as the second point approaches the first.

## Mathematics

Introduce:

\[
f'(x)
\]

Only after the visual intuition is established.

If a formal definition is shown, keep it secondary:

\[
f'(x)=\lim_{\Delta x\to0}\frac{f(x+\Delta x)-f(x)}{\Delta x}
\]

Do not make the limit notation the centerpiece.

## Real AI connection

Explain:

> A derivative tells us how much a quantity changes when its input changes slightly.

Later, that quantity will be the model's loss with respect to its parameters.

---

# 7. Topic 5.5 — Partial Derivatives

## Learning goal

The learner should understand:

> **A partial derivative asks how one variable affects the output while the others are temporarily held fixed.**

Use:

\[
f(x,y)=x^2+y^2
\]

## Main Interactive Visualization — Two-Parameter Landscape

Use a 3D surface or clean contour-map visualization.

Show two input dimensions:

```text
        y
        ↑
        |
        |      ●
        |
        └────────────→ x
```

Better implementation: use a bowl-shaped surface or contour map with a draggable point.

Display:

```text
Current position

x = 2
y = 3

∂f/∂x = 4
∂f/∂y = 6
```

## Hands-on experiment

Controls:

```text
Move x
──────●──────

Move y
────────●───
```

When the learner changes `x`, temporarily hold `y` fixed and show the effect of x.

Then do the reverse.

The learner should discover:

```text
Many inputs
    ↓
One output
    ↓
"What happens if I change THIS input?"
```

## Real AI connection

Introduce model parameters:

```text
Weight 1 ─┐
Weight 2 ─┼──→ Loss
Weight 3 ─┘
```

Then ask:

> How much would the loss change if I changed this particular weight?

Explain:

> That is the type of question a partial derivative answers.

This is the direct bridge to gradients.

---

# 8. Topic 5.6 — Gradients

## Learning goal

The learner should understand:

> **A gradient collects partial derivatives and points toward the direction of greatest increase.**

If:

\[
L(w_1,w_2)
\]

then:

\[
\nabla L=\left[\frac{\partial L}{\partial w_1},\n\frac{\partial L}{\partial w_2}\right]
\]

## Main Interactive Visualization — Which Way Is Up?

Use a 2D loss landscape or contour map.

Show a movable point and a gradient arrow:

```text
          ↑ w₂

       ↗ gradient
      ●
    ↙
──────────────→ w₁
```

As the learner moves the point:

- gradient direction changes;
- gradient magnitude updates;
- the arrow updates live.

## Key interaction

Add:

```text
[ Follow Gradient ]
[ Go Opposite ]
```

When the learner chooses **Follow Gradient**:

> Loss increases.

When they choose **Go Opposite**:

> Loss decreases.

This creates the intuition required for gradient descent.

## Playful explanation

A memorable callout can say:

> **Gradient says: "UPHILL → THIS WAY."**

Then:

> **Gradient descent says: "Cool. Let's go the other way."**

Keep this playful but mathematically correct.

## Real AI connection

Show:

```text
Loss
 ↓
Gradient
 ↓
Which direction increases loss?
 ↓
Go the opposite way
 ↓
Lower loss
```

---

# 9. Topic 5.7 — Gradient Descent

## Learning goal

The learner should understand:

> **Gradient descent is a method for adjusting model parameters to reduce loss.**

This should be the hero interaction of the chapter.

## Main Interactive Visualization — Watch the Model Learn

Use a bowl-shaped loss surface or contour map.

Place a starting parameter point somewhere on the slope.

Animate multiple optimization steps:

```text
Step 0
●

Step 1
  ●

Step 2
    ●

Step 3
      ●

Step 4
       ●
      minimum
```

Show the loss decreasing after each step.

## Hands-on experiment — Learning Rate

Give the learner:

```text
Learning Rate
──────●────────
```

Presets:

```text
[ Too Small ]
[ Just Right ]
[ Too Large ]
```

### Too Small

```text
●
 ●
  ●
   ●
    ●
```

Message:

> Learning is slow.

### Just Right

```text
●
   ●
      ●
        ●
```

Message:

> Smooth convergence.

### Too Large

```text
● →       ●
     ← ●
          → ●
```

Message:

> The model can overshoot instead of settling down.

This is one of the most important experiments in the chapter.

## Equation

Introduce:

\[
w_{\text{new}}=w_{\text{old}}-\eta\frac{\partial L}{\partial w}
\]

Explain visually:

```text
new value
=
old value
-
learning rate × gradient
```

Then show:

```text
OLD
 ↓
gradient tells direction
 ↓
learning rate controls step size
 ↓
NEW
```

For multiple parameters:

\[
\theta_{\text{new}}=\theta_{\text{old}}-\eta\nabla L
\]

Explain:

> `θ` represents the model's parameters, and `∇L` represents the gradient of the loss.

---

# 10. Chapter-Defining Integration

The final Gradient Descent experience should reuse concepts from earlier chapters instead of introducing an unrelated mathematical example.

Connect the chapters:

```text
CHAPTER 3
Model makes prediction
        ↓
CHAPTER 4
Prediction produces loss
        ↓
CHAPTER 5
Gradient tells us how to reduce that loss
```

The learner should see:

```text
INPUT
  ↓
MODEL
  ↓
PREDICTION
  ↓
LOSS
  ↓
GRADIENT
  ↓
UPDATE
  ↓
BETTER MODEL
```

This should make the website feel like one continuous story.

---

# 11. Chapter-Wide Visual Storyline

```text
5.1 FUNCTIONS
"What is a mathematical input → output relationship?"
        ↓
5.2 CHANGE
"How much did the output change?"
        ↓
5.3 SLOPE
"How quickly is it changing?"
        ↓
5.4 DERIVATIVES
"How quickly is it changing RIGHT HERE?"
        ↓
5.5 PARTIAL DERIVATIVES
"What happens if I change ONE input?"
        ↓
5.6 GRADIENTS
"What happens if I have MANY inputs?"
        ↓
5.7 GRADIENT DESCENT
"How do I use that information to improve the model?"
```

Final mental model:

```text
MODEL PARAMETERS
      ↓
     LOSS
      ↓
  GRADIENT
      ↓
"DIRECTION TO LOWER LOSS"
      ↓
 GRADIENT DESCENT
      ↓
UPDATE PARAMETERS
      ↓
 BETTER PREDICTION
```

---

# 12. Why Each Mathematical Concept Matters to AI

The content should repeatedly answer:

```text
Functions
→ models are functions

Change
→ model outputs change when parameters change

Slope
→ measures how quickly something changes

Derivative
→ measures local change

Partial derivative
→ measures effect of one parameter

Gradient
→ combines those effects

Gradient descent
→ uses them to reduce error
```

Do not present Chapter 05 as a generic calculus course.

The chapter exists to answer:

> **Why does AI need calculus?**

---

# 13. Suggested UI Structure

A useful content-body structure is:

```text
┌─────────────────────────────────────────┐
│ TOPIC TITLE                             │
│ One-sentence intuition                  │
├─────────────────────────────────────────┤
│                                         │
│        INTERACTIVE VISUALIZATION        │
│                                         │
│      [main interactive experience]      │
│                                         │
├─────────────────────────────────────────┤
│ WHAT JUST HAPPENED?                     │
│ Beginner explanation                    │
├─────────────────────────────────────────┤
│ TRY IT                                  │
│ Controls / experiment / challenge       │
├─────────────────────────────────────────┤
│ MATH BEHIND IT                          │
│ Equation / notation when appropriate    │
├─────────────────────────────────────────┤
│ REAL AI CONNECTION                      │
│ Why this matters in machine learning    │
└─────────────────────────────────────────┘
```

The exact visual layout can vary by topic. Do not force every page to look identical.

---

# 14. Design Tone

Keep the chapter:

- beginner-first;
- curious;
- playful;
- visual before formal;
- mathematical without being intimidating;
- interactive rather than lecture-like;
- consistent with the existing neo-brutalist design.

Avoid:

- formula dumping;
- unexplained calculus terminology;
- long academic paragraphs;
- decorative graphs without interaction;
- teaching derivative rules without explaining why they matter;
- introducing gradient descent before the learner understands derivatives and gradients.

---

# 15. End-of-Chapter Takeaway

The learner should finish with:

```text
MODEL PARAMETERS
      ↓
      LOSS
      ↓
HOW DOES LOSS CHANGE?
      ↓
PARTIAL DERIVATIVES
      ↓
GRADIENT
      ↓
WHICH DIRECTION REDUCES LOSS?
      ↓
GRADIENT DESCENT
      ↓
UPDATE PARAMETERS
      ↓
MODEL IMPROVES
```

Final message:

> **Calculus gives AI a way to measure how its error changes and use that information to improve its parameters.**

Then transition naturally to Chapter 06:

> **"We know which direction to move. But how do we push that learning backward through an entire neural network?"**

Next chapter:

**06. OPTIMIZE**
