using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class Update2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ConsignedPaperCount",
                table: "Tests",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "CorrectedPaperCount",
                table: "Tests",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "PaperCount",
                table: "Tests",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "PresentPaperCount",
                table: "Tests",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "TestGroupCount",
                table: "Tests",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "PaperCount",
                table: "TestGroupSupervisors",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ConsignedPaperCount",
                table: "TestGroups",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "CorrectedPaperCount",
                table: "TestGroups",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "PresentPaperCount",
                table: "TestGroups",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConsignedPaperCount",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "CorrectedPaperCount",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "PaperCount",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "PresentPaperCount",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "TestGroupCount",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "PaperCount",
                table: "TestGroupSupervisors");

            migrationBuilder.DropColumn(
                name: "ConsignedPaperCount",
                table: "TestGroups");

            migrationBuilder.DropColumn(
                name: "CorrectedPaperCount",
                table: "TestGroups");

            migrationBuilder.DropColumn(
                name: "PresentPaperCount",
                table: "TestGroups");
        }
    }
}
