import {handleMilestoneComplete} from '../utils/milestone'

const sum = (a, b) => {
    return a + b;
}

test('3 + 2', () => {
    expect(sum(3, 2)).toBe(5);
})