"""add branch_id to users

Revision ID: 5c63fbf55348
Revises: b38b5f3e6e65
Create Date: 2026-06-01 10:10:16.959954

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "5c63fbf55348"
down_revision: Union[str, Sequence[str], None] = "b38b5f3e6e65"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.add_column(
        "users",
        sa.Column(
            "branch_id",
            sa.String(),
            nullable=True
        )
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_column(
        "users",
        "branch_id"
    )