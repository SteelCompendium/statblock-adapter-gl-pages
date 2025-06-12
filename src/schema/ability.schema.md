# Draw Steel Ability Schema

This document describes the JSON schema for Draw Steel abilities, which represent actions, maneuvers, and other capabilities that creatures can use.

## Root Object

The root object represents a complete ability with the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | The title or description of the ability |
| `type` | string | Yes | Ability type (e.g., "Action", "Maneuver", "Triggered Action", "Villain Action 1") |
| `effects` | Effect[] | Yes | List of effects (flexible formats) |
| `flavor` | string | No | Flavor text of the ability |
| `cost` | string | No | Cost to use the ability (e.g., "5 Essence", "Signature", "2 Malice") |
| `keywords` | string[] | No | Keywords associated with the ability (e.g., ["Magic", "Earth", "Melee"]) |
| `distance` | string | No | Distance or area (e.g., "Ranged 5", "2 burst", "Melee 1") |
| `target` | string | No | Who or what is targeted (e.g., "All enemies", "One creature", "Self") |
| `trigger` | string | No | Trigger condition for triggered actions |
| `indent` | integer | No | Left-margin indentation for nested lists |

## Effect Types

Abilities can have different types of effects, which are defined as follows:

### Power Roll Effect

A power roll effect represents a roll with different outcomes based on the result.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `roll` | string | Yes | Power Roll expression (e.g., "2d10 + 3") |
| `[tier]` | string | No | Tier result (key can be '11 or lower', '12-16', '17+', 'crit', etc.) |

Example:
```json
{
  "roll": "2d10 + 3",
  "11 or lower": "3 sonic damage; slide 1; shift 1",
  "12-16": "6 sonic damage; slide 3; shift 3",
  "17+": "8 sonic damage; slide 5; shift 5"
}
```

### Named Effect with Cost

An effect that has a name and requires a cost to trigger.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Name of the effect |
| `cost` | string | Yes | Cost to trigger this effect |
| `effect` | string | Yes | Description of what the effect does |

Example:
```json
{
  "name": "Malice Boost",
  "cost": "3 Malice",
  "effect": "Each ally within 3 of a target has their speed increased by 2 until the end of their next turn."
}
```

### Effect with Cost

An effect that requires a cost to trigger.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `cost` | string | Yes | Cost to trigger this effect |
| `effect` | string | Yes | Description of what the effect does |

Example:
```json
{
  "cost": "2 Malice",
  "effect": "The maestro makes a free strike against the target."
}
```

### Named Effect

An effect that has a name but no cost.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Name of the effect |
| `effect` | string | Yes | Description of what the effect does |

Example:
```json
{
  "name": "Solo Performance",
  "effect": "Until the end of their next turn, the target halves incoming damage, deals an additional 4 damage on strikes, and their speed is doubled."
}
```

### String Effect

A simple string effect with no additional properties.

Example:
```json
"Each ally within distance can use Ready Rodent as a free triggered action once before the end of the round."
```

## Example

```json
{
  "name": "Cacophony",
  "type": "Action",
  "cost": "Signature",
  "keywords": ["Area", "Magic"],
  "effects": [
    {
      "roll": "2d10 + 3",
      "11 or lower": "3 sonic damage; slide 1; shift 1",
      "12-16": "6 sonic damage; slide 3; shift 3",
      "17+": "8 sonic damage; slide 5; shift 5"
    },
    "Each ally within distance can use Ready Rodent as a free triggered action once before the end of the round."
  ],
  "distance": "5 burst",
  "target": "All enemies in the burst"
}
``` 