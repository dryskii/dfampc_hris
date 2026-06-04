from pydantic import BaseModel


class UserCreate(BaseModel):

    username: str

    password: str

    role_id: str

    branch_id: int | None = None


class UserUpdate(BaseModel):

    username: str

    role_id: str

    branch_id: str | None = None

    is_active: bool = True


class UserResponse(BaseModel):

    id: str

    username: str

    role_id: str

    branch_id: str | None = None

    is_active: bool

    class Config:
        from_attributes = True