# exttime

extract time from natural sentences

the package is aimed to extract time from natural sentences.
few examples are as foolowing -

A typical match would be like this-

dp d tp t

- dp> day prefix
- d > day name or day shortcut
- tp> time prefix
- t > time

| day prefix | time prefix  |
| ---------- | ------------ |
| --empty--  | --empty--    |
| this       | on / by / at |
| next       |

the day and day shortcut are following -

| day       | day shortcut |
| --------- | ------------ |
| today     | tod          |
| tomorrow  | tom          |
| next week | -            |
| monday    | mon          |
| tuesday   | tue          |
| wednesday | wed          |
| thursday  | thu          |
| friday    | fri          |
| saturday  | sat          |
| sunday    | sun          |
