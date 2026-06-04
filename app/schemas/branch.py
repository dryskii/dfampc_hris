from pydantic import BaseModel


class BranchCreate(BaseModel):

    branch_name: str

    address: str

    region: str | None = None

    province: str | None = None

    city: str | None = None

    exact_address: str | None = None

    latitude: float

    longitude: float

    allowed_radius: float = 100


class BranchResponse(BranchCreate):

    id: int

    class Config:

        from_attributes = True