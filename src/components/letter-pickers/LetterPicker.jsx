import { DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
const { Option } = Select;

export const LetterPicker = ({ letter, setLetter, removeLetter }) => {
    return (
        <div style={{ display: 'flex' }}>
            <Select
                style={{ width: '20%' }}
                placeholder={'Pozycja'}
                onChange={(value) => setLetter({ ...letter, position: value })}
                value={letter.position}
            >
                {[0, 1, 2, 3, 4].map((v) => (
                    <Option value={v} key={v}>
                        {v + 1}
                    </Option>
                ))}
            </Select>
            <Input
                style={{ width: '20%' }}
                placeholder="Litera"
                value={letter.character || ''}
                onChange={(e) =>
                    setLetter({ ...letter, character: e.target.value.slice(-1) })
                }
            />
            <Select
                placeholder={'Prawidłowa pozycja?'}
                style={{ width: '40%' }}
                onChange={(value) =>
                    setLetter({ ...letter, isValidPosition: value })
                }
                value={letter.isValidPosition}
            >
                <Option value={true}>Prawidłowa pozycja</Option>
                <Option value={false}>Nieprawidłowa pozycja</Option>
            </Select>
            <Button
                onClick={removeLetter}
                icon={<DeleteOutlined />}
                style={{ width: '20%' }}
            />
        </div>
    );
};
