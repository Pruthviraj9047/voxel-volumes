# Design System Strategy: Structural Avant-Garde

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Blueprint Manifesto."** 

Voxel Volumes is not a standard architectural studio; it is a laboratory where industrial precision meets pop-art energy. This system rejects the "soft" web of today in favor of a rigid, unapologetic structuralism. We are moving away from the "template" look by treating the browser as a technical drafting table. 

While the aesthetic is rooted in Bauhaus Minimalism, it is disrupted by the high-contrast "Pop" of Blueprint Blue and a heavy, 2px stroke. We break the mold of modern "flat" design by using **extreme structural definition.** Instead of subtle shadows, we use hard lines; instead of organic curves, we use absolute 0px corners. The result is a UI that feels built, not just rendered.

## 2. Design Tokens & Surface Logic
*   **Color Mode:** LIGHT
*   **Custom Color:** `#0047AB` (Blueprint Blue)

### **Named Colors Map**
*   **Background:** `#f9f9f9`
*   **Surface:** `#f9f9f9`
*   **On-Background / On-Surface:** `#1a1c1c`
*   **Primary:** `#00327d`
*   **Primary Container:** `#0047ab`
*   **Outline:** `#737784`
*   **Outline Variant:** `#c3c6d5`
*   **Error:** `#ba1a1a`
*   **Secondary:** `#5e5e5e`
*   **Secondary Container:** `#e2e2e2`

### **Typography**
*   **Headline Font:** Space Grotesk
*   **Body Font:** Inter
*   **Label Font:** Space Grotesk Monospace

## 3. Structural Rules
*   **The "Structural Stroke" Rule:** Every 2px border (using the `on_surface` or `outline` tokens) must represent a structural boundary.
*   **Zero Shadows:** Shadow effects are prohibited. Hierarchy is achieved using Tonal Containment (decreasing values of background brightness like `#e2e2e2`).
*   **Texture Gradient:** For hero moments, utilize a Technical Blueprint Gradient transitioning from `#00327D` to `#0047AB` at a 45-degree angle.

## 4. Components Logic

### Buttons
*   **Primary:** Solid `on_surface` (Black) background, `surface` (White) text. 0px corner radius. 2px border. Hover shift to `primary` (Blueprint Blue).
*   **Secondary:** Ghost style. 2px `on_surface` border, `on_surface` text, no background.
*   All button text should use `label-md` in All-Caps.

### Input Fields
*   2px solid `on_surface` border with 0px rounded corners.
*   On focus, the border shifts to `primary` (Blueprint Blue).

### Cards & Lists
*   No standard dividers. Use **Negative Space** or **Full Enclosure**. 
*   Structural cards must have a 2px black border.

## 5. Asset Paths & Textures
*   **Thumbnail Screenshot:** [View Full Image](https://lh3.googleusercontent.com/aida/ADBb0ujHTAOQSWyPXxgEv7RSFtq1f6yQE0Mw3lB08FBx3ALq3ZmUnCK_T4H6TQQUWiF7gDfrjAqPVPv0PoJA9t9fFKFVtsS9MA1wUWzeb-D5H93m-l0b7ltRNt-88GM6JE5eVpmo_728MDkoaSIaMc52nA7EiDekZjHL-p5HnfFN1nbkgtT78ugNlr0Ikikm9zb69uXW-LcM8qyO879yZZwVMOWi-ejPoxpngekB4s2dOeLmFT95oBHS914hQw) 
*(This asset serves as a visual guide and texture reference for the project).*
*   **Stitch Asset Identifiers:** `assets/a5641ef9ad794f5c983b148b5e5868f0`
