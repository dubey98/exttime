# exttime

extract time from natural sentences

the package is aimed to extract time from natural sentences.
few examples are as foolowing -

A typical match would be like this-

"fetch the grocery from store today"

from the above sentence we match the _today_ and the output will be _Fri Oct 22 2021 09:00:00 GMT+0530 (India Standard Time)_ according to the timezone and day you run this on.

few more examples -

- "lets watch movie this _sunday_"
- "lets got the market _tomorrow at 12:30_"
- "get a pizza _tuesday 06:50pm_"
- "we will make a plane either this _monday_ or _friday_"

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
